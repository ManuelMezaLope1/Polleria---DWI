#uvicorn consultas:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import requests
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:4200"
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

            if len(franja_df) < 2:
                continue

            franja_df["dia"] = np.arange(len(franja_df))

            X = franja_df[["dia"]]
            y = franja_df["cantidad"]

            modelo = RandomForestRegressor(
                n_estimators=100,
                random_state=42
            )

            modelo.fit(X, y)

            siguiente_dia = pd.DataFrame(
                [[len(franja_df)]],
                columns=["dia"]
            )

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