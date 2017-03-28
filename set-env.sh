#!/bin/sh

#Server Port
export SERVER_PORT=8081

#JHipster Registry
export JHIPSTER_REGISTRY_SERVER_IP=192.168.25.128
export JHIPSTER_REGISTRY_SERVER_PORT=8761

#MongoDB
export MONGODB_SERVER_IP=192.168.25.128
export MONGODB_SERVER_PORT=27017
export MONGODB_SERVER_DB=backendapi

export PATH=$PATH:$JHIPSTER_REGISTRY_SERVER_IP:$JHIPSTER_REGISTRY_SERVER_PORT:$MONGODB_SERVER_IP:$MONGODB_SERVER_PORT:$MONGODB_SERVER_DB%