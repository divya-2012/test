# Create a new file called entrypoint.sh
#!/bin/sh
npx prisma migrate deploy
node dist/index.js

# In Dockerfile
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]