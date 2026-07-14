#uvicorn consultas:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import requests
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:4200",
    "https://0l0wjff4-4200.brs.devtunnels.ms"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/prediccion/venta-mañana")
def obtener_prediccion():
    try:
        url = "http://localhost:8080/api/v1/public/ventas-dia-ml"

        r = requests.get(url, timeout=10)
        r.raise_for_status()

        datos = r.json()
        df = pd.DataFrame(datos)

        df["fecha"] = np.arange(len(df))

        X = df[["fecha"]]
        y = df["cantidad"]

        modelo = LinearRegression()
        modelo.fit(X, y)

        proximo_dia = pd.DataFrame([[len(df)]], columns=["fecha"])
        prediccion = modelo.predict(proximo_dia)

        return {"ventasManana": round(float(prediccion[0]), 2)}

    except Exception as e:
        return {"error": str(e)}

@app.get("/prediccion/venta-mañana-total")
def obtener_total_ventas_manana():
    try:
        url = "http://localhost:8080/api/v1/public/ventas-dia-ml"
        
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)
        df["fecha"] = np.arange(len(df))

        X = df[["fecha"]]
        y = df["total"]

        modelo = LinearRegression()
        modelo.fit(X, y)

        proximo_dia = pd.DataFrame(
            [[len(df)]],
            columns=["fecha"]
        )

        prediccion = modelo.predict(proximo_dia)

        return {
            "ventasManana": round(float(prediccion[0]), 2)
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/prediccion/platos-ventas-ml")
def obtener_total_ventas_manana():
    try:
        url = "http://localhost:8080/api/v1/public/platos-ventas-ml"
        
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)
        df["nombre"] = np.arange(len(df))

        X = df[["nombre"]]
        y = df["cantidad"]

        modelo = LinearRegression()
        modelo.fit(X, y)

        proximo_dia = pd.DataFrame(
            [[len(df)]],
            columns=["nombre"]
        )

        prediccion = modelo.predict(proximo_dia)

        return {
            "ventasPlatos": round(float(prediccion[0]), 2)
        }
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/historico-platos")
def obtener_prediccion_platos():
    url = "http://localhost:8080/api/v1/public/historico-platos-ml"

    datos = requests.get(url).json()

    df = pd.DataFrame(datos)

    print(df.head(20))
    print(df.columns)
    print(df["nombre"].unique())
    print(df.shape)

    for plato in df["nombre"].unique():
        plato_df = df[df["nombre"] == plato]
        print(plato, len(plato_df))

    try:
        url = "http://localhost:8080/api/v1/public/historico-platos-ml"

        datos = requests.get(url).json()

        df = pd.DataFrame(datos)

        resultados = []

        for plato in df["nombre"].unique():

            plato_df = df[df["nombre"] == plato].copy()

            # Se necesitan al menos 2 registros
            if len(plato_df) < 2:
                continue

            plato_df = plato_df.sort_values("fecha")

            plato_df["dia"] = np.arange(len(plato_df))

            X = plato_df[["dia"]]
            y = plato_df["cantidad"]

            modelo = LinearRegression()
            modelo.fit(X, y)

            siguiente_dia = pd.DataFrame(
                [[len(plato_df)]],
                columns=["dia"]
            )

            prediccion = modelo.predict(siguiente_dia)

            resultados.append({
                "nombre": plato,
                "cantidadManana": max(
                    0,
                    round(float(prediccion[0]), 2)
                )
            })

        resultados.sort(
            key=lambda x: x["cantidadManana"],
            reverse=True
        )

        return resultados

    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/historico-franja-pedidos")
def obtener_prediccion_franja_pedidos():
    try:
        url = "http://localhost:8080/api/v1/public/historico-franja-pedidos-ml"

        datos = requests.get(url).json()

        df = pd.DataFrame(datos)

        resultados = []

        for franja in df["franja"].unique():

            franja_df = df[df["franja"] == franja].copy()
            franja_df["fecha"] = pd.to_datetime(franja_df["fecha"], errors="coerce")

            if len(franja_df) < 2:
                continue

            franja_df["dia"] = np.arange(len(franja_df))
            franja_df["dia_semana"] = franja_df["fecha"].dt.dayofweek
            franja_df["mes"] = franja_df["fecha"].dt.month
            franja_df["dia_mes"] = franja_df["fecha"].dt.day
            
            X = franja_df[
                [
                    "dia",
                    "dia_semana",
                    "dia_mes",
                    "mes"
                ]
            ]

            y = franja_df["cantidad"]

            modelo = RandomForestRegressor(
                n_estimators=100,
                random_state=42
            )

            modelo.fit(X, y)

            ultima_fecha = franja_df["fecha"].max()
            fecha_siguiente = ultima_fecha + pd.Timedelta(days=1)

            siguiente_dia = pd.DataFrame({
                "dia": [len(franja_df)],
                "dia_semana": [fecha_siguiente.dayofweek],
                "dia_mes": [fecha_siguiente.day],
                "mes": [fecha_siguiente.month]
            })

            prediccion = modelo.predict(siguiente_dia)

            resultados.append({
                "franja": franja,
                "cantidadManana": round(
                    float(prediccion[0]), 2
                )
            })

        resultados.sort(
            key=lambda x: x["cantidadManana"],
            reverse=True
        )

        return resultados
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/mayor-franja-horaria")
def obtener_mayor_franja_horaria():
    try:
        url = "http://localhost:8080/api/v1/public/historico-franja-pedidos-ml"
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)
        df["fecha"] = pd.to_datetime(df["fecha"])
        resultados = []
        for franja in df["franja"].unique():
            franja_df = df[
                df["franja"] == franja
            ].copy()

            if len(franja_df) < 3:
                continue

            fecha_inicial = franja_df["fecha"].min()

            franja_df["dia"] = (
                franja_df["fecha"] -
                fecha_inicial
            ).dt.days

            X = franja_df[["dia"]]
            y = franja_df["cantidad"]

            modelo = RandomForestRegressor(
                n_estimators=200,
                random_state=42
            )

            modelo.fit(X, y)

            manana = pd.DataFrame(
                [[
                    franja_df["dia"].max() + 1
                ]],
                columns=["dia"]
            )

            prediccion = modelo.predict(manana)

            resultados.append({
                "franja": franja,
                "cantidadManana": round(
                    float(prediccion[0])
                )
            })

        resultados.sort(
            key=lambda x: x["cantidadManana"],
            reverse=True
        )

        return {
            "predicciones": resultados,
            "franjaMayor": resultados[0]
        }
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/historico-categoria-ventas")
def obtener_historico_categoria_ventas():
    try:
        url = "http://localhost:8080/api/v1/public/historico-categoria-ventas-ml"
        datos = requests.get(url).json()

        df = pd.DataFrame(datos)

        df["fecha"] = pd.to_datetime(df["fecha"])

        resultados = []

        for categoria in df["categoria"].unique():

            categoria_df = df[
                df["categoria"] == categoria
            ].copy()

            if len(categoria_df) < 3:
                continue

            fecha_inicial = categoria_df["fecha"].min()

            categoria_df["dia"] = (
                categoria_df["fecha"] -
                fecha_inicial
            ).dt.days

            categoria_df["dia_semana"] = categoria_df["fecha"].dt.dayofweek

            categoria_df["dia_mes"] = categoria_df["fecha"].dt.day

            categoria_df["mes"] = categoria_df["fecha"].dt.month

            X = categoria_df[
                [
                    "dia",
                    "dia_semana",
                    "dia_mes",
                    "mes"
                ]
            ]

            y = categoria_df["cantidad"]

            modelo = RandomForestRegressor(

                n_estimators=200,

                random_state=42

            )

            modelo.fit(X, y)

            ultima = categoria_df["fecha"].max()

            manana = ultima + pd.Timedelta(days=1)

            siguiente = pd.DataFrame({

                "dia":[
                    (manana-fecha_inicial).days
                ],

                "dia_semana":[
                    manana.dayofweek
                ],

                "dia_mes":[
                    manana.day
                ],

                "mes":[
                    manana.month
                ]

            })

            prediccion = modelo.predict(siguiente)

            resultados.append({

                "categoria":categoria,

                "cantidadManana":round(
                    float(prediccion[0])
                )

            })

        resultados.sort(

            key=lambda x:x["cantidadManana"],

            reverse=True

        )

        return{

            "categorias":resultados,

            "categoriaMayor":resultados[0]

        }
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/plato-crecimiento")
def obtener_plato_crecimiento():
    try:
        url = "http://localhost:8080/api/v1/public/historico-platos-ml"
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)
        df["fecha"] = pd.to_datetime(df["fecha"])
        resultados = []

        for plato in df["nombre"].unique():
            plato_df = df[df["nombre"] == plato].copy()
            if len(plato_df) < 3:
                continue

            fecha_inicial = plato_df["fecha"].min()
            plato_df["dia"] = (
                plato_df["fecha"] -
                fecha_inicial
            ).dt.days

            plato_df["dia_semana"] = plato_df["fecha"].dt.dayofweek
            plato_df["dia_mes"] = plato_df["fecha"].dt.day
            plato_df["mes"] = plato_df["fecha"].dt.month

            X = plato_df[
                [
                    "dia",
                    "dia_semana",
                    "dia_mes",
                    "mes"
                ]
            ]

            y = plato_df["cantidad"]

            modelo = RandomForestRegressor(
                n_estimators=200,
                random_state=42
            )

            modelo.fit(X, y)
            ultima = plato_df["fecha"].max()
            manana = ultima + pd.Timedelta(days=1)
            siguiente = pd.DataFrame({
                "dia":[
                    (manana-fecha_inicial).days
                ],

                "dia_semana":[
                    manana.dayofweek
                ],

                "dia_mes":[
                    manana.day
                ],

                "mes":[
                    manana.month
                ]
            })

            prediccion = modelo.predict(siguiente)[0]
            promedio = plato_df["cantidad"].mean()

            if promedio > 0:
                crecimiento = (
                    (prediccion - promedio)
                    / promedio
                ) * 100

            else:
                crecimiento = 0

            resultados.append({
                "nombre": plato,
                "promedio": round(float(promedio),2),
                "cantidadManana": round(float(prediccion),2),
                "crecimiento": round(float(crecimiento),2)
            })

        resultados.sort(
            key=lambda x: x["crecimiento"],
            reverse=True
        )

        return {
            "platos": resultados,
            "mayorCrecimiento": resultados[0]
        }
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/historico-ventas")
def obtener_historico_ventas():
    try:
        url = "http://localhost:8080/api/v1/public/historico-ventas-ml"
        datos = requests.get(url).json()

        df = pd.DataFrame(datos)

        df["fecha"] = pd.to_datetime(df["fecha"])

        # Ordenar por fecha
        df = df.sort_values("fecha")

        # Día consecutivo desde la primera venta
        fecha_inicial = df["fecha"].min()

        df["dia"] = (
            df["fecha"] - fecha_inicial
        ).dt.days

        # Variables para Machine Learning
        df["dia_semana"] = df["fecha"].dt.dayofweek
        df["dia_mes"] = df["fecha"].dt.day
        df["mes"] = df["fecha"].dt.month
        df["fin_semana"] = (
            df["dia_semana"] >= 5
        ).astype(int)

        # Variables independientes
        X = df[
            [
                "dia",
                "dia_semana",
                "dia_mes",
                "mes",
                "fin_semana"
            ]
        ]

        # Variable objetivo
        y = df["cantidad"]

        # Modelo
        modelo = RandomForestRegressor(
            n_estimators=200,
            random_state=42
        )

        modelo.fit(X, y)

        # ----------------------------
        # Datos para mañana
        # ----------------------------

        ultima_fecha = df["fecha"].max()

        manana = ultima_fecha + pd.Timedelta(days=1)

        siguiente = pd.DataFrame({

            "dia": [
                (manana - fecha_inicial).days
            ],

            "dia_semana": [
                manana.dayofweek
            ],

            "dia_mes": [
                manana.day
            ],

            "mes": [
                manana.month
            ],

            "fin_semana": [
                1 if manana.dayofweek >= 5 else 0
            ]

        })

        prediccion = modelo.predict(siguiente)

        ventas_manana = max(
            0,
            round(float(prediccion[0]))
        )

        # ----------------------------
        # Estadísticas
        # ----------------------------

        promedio = df["cantidad"].mean()

        variacion = (
            (
                ventas_manana
                - promedio
            )
            / promedio
        ) * 100

        if variacion >= 10:

            tendencia = "Creciente"

            recomendacion = (
                "Se espera un incremento en las ventas. "
                "Considere aumentar el stock de insumos y reforzar el personal."
            )

        elif variacion <= -10:

            tendencia = "Decreciente"

            recomendacion = (
                "Se proyecta una disminución en las ventas. "
                "Se recomienda evaluar promociones o campañas."
            )

        else:

            tendencia = "Estable"

            recomendacion = (
                "Las ventas se mantendrán dentro del promedio histórico."
            )

        # ----------------------------
        # Historial
        # ----------------------------

        historico = []

        for _, fila in df.iterrows():

            historico.append({

                "fecha": fila["fecha"].strftime("%Y-%m-%d"),

                "cantidad": int(fila["cantidad"])

            })

        # ----------------------------
        # Respuesta
        # ----------------------------

        return {

            "historico": historico,

            "prediccionManana": ventas_manana,

            "promedioHistorico": round(
                float(promedio), 2
            ),

            "variacionPorcentaje": round(
                float(variacion), 2
            ),

            "tendencia": tendencia,

            "recomendacion": recomendacion

        }
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/prediccion/cantidad-platos-recomendaciones")
def obtener_cantidad_platos_recomendaciones():
    try:
        url = "http://localhost:8080/api/v1/public/cantidad-platos-recomendacion-ml"
        urlDos="http://localhost:8080/api/v1/public/usuarios-frecuentes-ml"
        urlTres="http://localhost:8080/api/v1/public/cantidad-ofertas-recomendacion-ml"

        datos = requests.get(url).json()
        datosDos=requests.get(urlDos).json()
        datosTres=requests.get(urlTres).json()

        recomendaciones=[]

        df = pd.DataFrame(datos)
        dfDos=pd.DataFrame(datosDos)
        dfTres=pd.DataFrame(datosTres)

        promedio = df["cantidad"].mean()
        promedioTres=dfTres["cantidad"].mean()
        
        for _, fila in df.iterrows():
            if fila["cantidad"] < promedio * 0.5:
                recomendaciones.append({
                    "tipo": "Plato",
                    "titulo": "Venta baja",
                    "mensaje": f"Considere crear una promoción para {fila['nombre']}."
                })

        for _, fila in dfDos.iterrows():
            if fila["compras"] >= 30 and fila["totalGastado"] >= 3000:
                recomendaciones.append({
                    "tipo":"Cliente VIP",
                    "titulo": "Cliente Vip",
                    "mensaje":
                        f"{fila['username']} es uno de los mejores clientes de la pollería."
                })
            
            elif fila['compras']<30 and fila['compras']>6 and fila["totalGastado"]>=700:
                recomendaciones.append({
                    "tipo":"Cliente Frecuente",
                    "titulo": "Cliente Frecuente",
                    "mensaje":
                        f"{fila['username']} es un cliente recurrente. Considere ofrecerle un cupón"
                })
                
            elif fila["compras"] < 5:
                recomendaciones.append({
                    "tipo":"Cliente Ocasional",
                    "titulo": "Cliente Ocasional",
                    "mensaje":
                    f"{fila['username']} ha comprado pocas veces. Considere enviarle una promoción."
                })

        for _, fila in dfTres.iterrows():
            if fila["cantidad"] < promedio * 0.5:
                recomendaciones.append({
                    "tipo": "Promoción",
                    "titulo":"Promoción baja",
                    "mensaje": f"Considere actualizar la promoción {fila['nombre']}."
                })

        return recomendaciones
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/recomendacion/ofertas")
def obtener_recomendacion_ofertas():
    try:
        url = "http://localhost:8080/api/v1/public/combinaciones-platos-ml"
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)
        basket = pd.crosstab(
            df["detalleVenta"],
            df["nombre"]
        )

        basket = basket > 0

        frecuentes = apriori(
            basket,
            min_support=0.01,
            use_colnames=True
        )

        reglas = association_rules(
            frecuentes,
            metric="confidence",
            min_threshold=0.10
        )

        reglas = reglas.sort_values(
            by="lift",
            ascending=False
        )

        recomendaciones = []

        for _, fila in reglas.head(4).iterrows():
            productos = list(fila["antecedents"])
            sugeridos = list(fila["consequents"])
            combo = productos + sugeridos
            precio = 0

            for producto in combo:
                precio += df.loc[
                    df["nombre"] == producto,
                    "precio"
                ].iloc[0]

            if fila["confidence"] >= 0.90:
                descuento = 10
            elif fila["confidence"] >= 0.75:
                descuento = 15
            elif fila["confidence"] >= 0.60:
                descuento = 20
            else:
                descuento = 25

            precioOferta = round(
                precio * (1 - descuento / 100),
                2
            )

            recomendaciones.append({
                "productos": combo,
                "precioOriginal": round(precio,2),
                "descuento": descuento,
                "precioOferta": precioOferta,
                "confianza": round(
                    fila["confidence"] * 100,
                    2
                ),
                "lift": round(
                    fila["lift"],
                    2
                )
            })

        return recomendaciones

    except Exception as e:
        return {
            "error": str(e)
        }
    
@app.get("/recomendacion/produccion")
def obtener_recomendacion_produccion():
    try:
        url = "http://localhost:8080/api/v1/public/historico-platos-ml"

        datos = requests.get(url).json()

        df = pd.DataFrame(datos)

        resultados = []

        for plato in df["nombre"].unique():

            plato_df = df[df["nombre"] == plato].copy()

            if len(plato_df) < 2:
                continue

            plato_df["fecha"] = pd.to_datetime(plato_df["fecha"])

            fecha_inicial = plato_df["fecha"].min()

            plato_df["dia"] = (
                plato_df["fecha"] - fecha_inicial
            ).dt.days

            X = plato_df[["dia"]]
            y = plato_df["cantidad"]

            modelo = RandomForestRegressor(
                n_estimators=100,
                random_state=42
            )

            modelo.fit(X, y)

            manana = pd.DataFrame(
                [[plato_df["dia"].max() + 1]],
                columns=["dia"]
            )

            cantidad = round(float(modelo.predict(manana)[0]))

            if cantidad < 1:
                cantidad = 1
                
            if cantidad<11:
                primer_lote = round(cantidad * 1)
            elif cantidad<21:
                primer_lote = round(cantidad * 0.80)
            elif cantidad<41:
                primer_lote = round(cantidad * 0.70)
            else:
                primer_lote = round(cantidad * 0.60)

            segundo_lote = cantidad - primer_lote

            resultados.append({
                "plato": plato,
                "cantidadEstimada": cantidad,
                "primerLote": primer_lote,
                "segundoLote": segundo_lote
            })

        resultados.sort(
            key=lambda x: x["cantidadEstimada"],
            reverse=True
        )

        return resultados

    except Exception as e:
        return {
            "error": str(e)
        }
    
@app.get("/recomendacion/combinaciones")
def obtener_combinaciones():
    try:
        url = "http://localhost:8080/api/v1/public/combinaciones-platos-ml"
        datos = requests.get(url).json()
        df = pd.DataFrame(datos)

        basket = pd.crosstab(
            df["detalleVenta"],
            df["nombre"]
        )

        basket = basket > 0

        frecuentes = apriori(
            basket,
            min_support=0.02,
            use_colnames=True
        )

        reglas = association_rules(
            frecuentes,
            metric="confidence",
            min_threshold=0.40
        )

        reglas = reglas.sort_values(
            by="lift",
            ascending=False
        )

        recomendaciones = []

        for _, fila in reglas.iterrows():
            antecedentes = list(fila["antecedents"])
            consecuentes = list(fila["consequents"])

            recomendaciones.append({
                "platoPrincipal": antecedentes[0],
                "acompanamientos": consecuentes,
                "confianza": round(
                    fila["confidence"] * 100,
                    2
                ),

                "lift": round(
                    fila["lift"],
                    2
                )
            })

        return recomendaciones[:5]
    except Exception as e:
        return {
            "error": str(e)
        }