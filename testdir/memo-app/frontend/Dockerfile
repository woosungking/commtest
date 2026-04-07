# --platform=$BUILDPLATFORM을 붙여서 
# 빌드(npm install/build)는 맥북(ARM)의 네이티브 속도로 수행하고
FROM --platform=$BUILDPLATFORM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 최종 이미지만 타겟 플랫폼(amd64/arm64)에 맞게 생성
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html