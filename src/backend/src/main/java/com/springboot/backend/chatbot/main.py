#Ejecutar el chatbot: uvicorn main:app --reload --port 5000#

from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
import ollama

app = FastAPI()

class ChatRequest(BaseModel):
    mensaje:str

def conectar_db():
    return mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="root",
        database="polleria"
    )

def obtener_menu():
    db = conectar_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT nombre FROM categorias
    """)

    platos = cursor.fetchall()

    cursor.close()
    db.close()

    return "\n".join([
        f"{nombre}"
        for nombre in platos
    ])

def obtener_platos():
    db=conectar_db()
    cursor=db.cursor()
    cursor.execute("SELECT nombre, precio FROM platos")
    platos=cursor.fetchall()

    cursor.close()
    db.close()

    return "\n".join([f"{nombre}: S/.{precio}" for nombre, precio in platos])

def obtener_categoria_bebidas():
    db=conectar_db()
    cursor=db.cursor()
    cursor.execute("""SELECT p.nombre AS plato, p.precio AS precio FROM platos p 
                   JOIN categorias c ON c.id=p.categoria_id WHERE c.nombre='Bebidas'""")
    
    bebidas=cursor.fetchall()

    cursor.close()
    db.close()

    return "\n".join([
        f"{plato}: S/.{precio}" 
        for plato, precio in bebidas])

def obtener_promociones():
    db = conectar_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT nombre, descripcion, precio_nuevo
        FROM ofertas
    """)

    ofertas = cursor.fetchall()

    cursor.close()
    db.close()

    return "\n".join([
        f"{nombre}: {descripcion}: S/.{precio}"
        for nombre, descripcion, precio in ofertas
    ])

def obtener_plato_alergias():
    db=conectar_db()
    cursor=db.cursor()

    cursor.execute("""
        SELECT p.nombre AS plato, p.precio AS precio, GROUP_CONCAT(DISTINCT i.nombre SEPARATOR ', ') AS ingredientes,
        GROUP_CONCAT(DISTINCT a.nombre SEPARATOR ', ') AS alergias FROM ingredientes i
        JOIN alergias a ON a.id = i.alergia_id JOIN ingrediente_plato ip ON ip.ingrediente_id = i.id
        JOIN platos p ON p.id = ip.plato_id
        WHERE a.nombre <> 'No tiene'
        GROUP BY p.id, p.nombre, p.precio
        ORDER BY p.nombre;
    """)

    plato_alergias=cursor.fetchall()

    cursor.close()
    db.close()

    return "\n".join([f"{nombre}: S/.{precio}: {ingredientes}: {alergias}" for nombre, precio, ingredientes, alergias in plato_alergias])

@app.get("/inicio")
def inicio():

    return {
        "respuesta":
        """
        Hola 😊 Bienvenido a la pollería El Sazón. ¿En qué puedo ayudarte?\n\n
        
        🍗 Carta
        🔥 Promociones
        🌶️ Platos picantes
        🥗 Platos con alergias
        ⭐ Recomendaciones
        """
    }

@app.post("/chat")
def chat(request:ChatRequest):

    carta = obtener_menu()
    plato=obtener_platos()
    promociones = obtener_promociones()
    plato_alergias=obtener_plato_alergias()
    bebidas=obtener_categoria_bebidas()

    prompt = f"""
    Eres un mesero de la pollería El Sazón.

    Carta: {carta}
    Platos: {plato}
    Promociones: {promociones}
    Platos con Alergias: {plato_alergias}
    Bebidas: {bebidas}

    Responde de forma breve y amable. Usa HTML simple. Usa <h6>, <ul>, <li>, <br>. No uses texto plano.
    Responde en español.
    """

    response = ollama.chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role":"system",
                "content":prompt
            },
            {
                "role":"user",
                "content":request.mensaje
            }
        ]
    )

    return {
        "respuesta":
        response['message']['content']
    }