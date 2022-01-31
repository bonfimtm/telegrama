"use strict";

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAyTLTqMuDSaf4DnrPK-pYJe4f29h0g-lk",
  authDomain: "telegrama-91b14.firebaseapp.com",
  projectId: "telegrama-91b14",
});

const db = firebase.firestore();

db.collection("mensagens")
  .orderBy("criacao", "desc")
  .onSnapshot((querySnapshot) => {
    const mensagensElm = document.querySelector("#mensagens");
    mensagensElm.replaceChildren();
    querySnapshot.forEach((doc) => {
      const pElm = document.createElement("p");
      const textElm = document.createTextNode(doc.data().conteudo);
      pElm.appendChild(textElm);
      mensagensElm.appendChild(pElm);
    });
  });

function enviarMensagem(event) {
  event.preventDefault();
  const conteudo = document.querySelector("#conteudo").value;
  const criacao = new Date();
  if (conteudo) {
    db.collection("mensagens")
      .add({ conteudo, criacao })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .finally(() => {
        document.querySelector("#conteudo").value = "";
      });
  }
}
