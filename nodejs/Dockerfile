# uso ubuntu:focal per analogia con l'immagine usata in mongodb
FROM ubuntu:focal
# FROM ubuntu:xenial

# BACKEND

ENV WORKINGDIR=/root/backend

WORKDIR ${WORKINGDIR}

RUN	mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}

COPY 	./backend  ${WORKINGDIR}/

RUN	apt-get -y update	 &&	\
	apt-get -y install --no-install-recommends \
	  nodejs	\
	  npm			\
	  curl			\
	  wget			\
		&& \
	apt-get -y clean; \
  rm -rf /var/lib/apt/lists/*;

RUN	npm install

EXPOSE 3000

CMD npm start

# FRONTEND
ENV WORKINGDIR=/root/frontend

WORKDIR ${WORKINGDIR}

RUN	mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}

COPY 	./frontend  ${WORKINGDIR}/

RUN	apt-get -y update	 &&	\
	apt-get -y install --no-install-recommends \
	  nodejs	\
	  npm			\
	  curl			\
	  wget			\
		&& \
	apt-get -y clean; \
  rm -rf /var/lib/apt/lists/*;

RUN	npm install

EXPOSE 5173

CMD npm run dev
