import firebase_admin
from firebase_admin import credentials, firestore

firebase_admin.initialize_app(credentials.Certificate('deschamps_bd.json'))
db = firestore.client()

def bddefinir(nome, canal):
    doc_ref = db.collection(u'Discord').document(nome).set(canal)
    data = db.collection(u'Discord').document(nome)

def bdreceber(nome):
    data = db.collection(u'Discord').document(nome)
    dados = data.get()
    if dados.exists:
        return dados.to_dict()
    else:
        return False

def bdnoticias():
    data = db.collection(u'Discord').stream()
    dados, temp = [], []
    for i in data:
        temp.append(i.id)
        temp.append(i.to_dict())
        dados.append(temp[:])
        temp.clear()

    return dados
