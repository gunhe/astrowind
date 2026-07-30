podman rm ccc_astrowind
podman rm ttt_astrowind



# 构建镜像
podman build -t ttt_astrowind .

# 启动容器
podman run -d \
  --name ccc_astrowind \
  --restart unless-stopped \
  -p 18081:8080 \
  ttt_astrowind