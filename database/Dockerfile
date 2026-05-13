FROM postgres:15-alpine
ENV POSTGRES_DB=farmacia_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin_password
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
