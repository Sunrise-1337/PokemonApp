# PokemonApp
This project uses **Angular 18 (SSR)**. It supports containerized deployment via Docker and features an automated CI/CD pipeline in GitLab.

## Local Deployment
To run the application locally in a production-like environment:

1. **Build the image:**
   `docker build -t pokemon-app .`
2. **Run the container:**
   `docker run -d -p 80:4000 --name pokemon-running pokemon-app`
3. **Open: http://localhost**