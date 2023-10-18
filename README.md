# KronosDB
Web App per la gestione di interventi tecnici effettuati da Kronos S.R.L., Forli.

# 🛠 Setup
## 1. Tramite Makefile
Aprire il terminale e spostarsi sulla cartella dove si ha scaricato il Makefilee lanciare il seguente comando:
```
make all
```
Questo equivale ad eseguire i tre comandi in sequenza:
1. ``` make clone ``` -> esegue il clone (o il pull se esiste già) del repo
2. ``` make build ``` -> esegue la build delle immagini Docker
3. ``` make run ``` -> crea ed esegue i container generati dalle immagini

## 2. Tramite docker-compose
Clonare repo sul Desktop, spostarsi col terminale sul repo e lanciare sequenzialmente i comandi:
``` docker-compose build ``` e ``` docker-compose up -d ```
