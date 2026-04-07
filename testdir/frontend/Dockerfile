# 1단계: 빌드 (맥북의 ARM64 성능을 그대로 사용하여 에러 방지)
FROM --platform=$BUILDPLATFORM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2단계: 실행 (최종 결과물만 라이트세일용 amd64에 담기)
FROM nginx:alpine
RUN apk add --no-cache bash
# 빌드 단계에서 생성된 dist 폴더 복사
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
