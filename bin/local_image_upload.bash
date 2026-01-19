#!/bin/bash
LOCAL_LOGIN_TOKEN="$1"

curl --data-binary "@images/test_image_one.png" \
  --cookie "session=$LOCAL_LOGIN_TOKEN" \
  -H "Portfolio-File-Name: test_artifact_one.png" \
  -H "Content-Length: 117642" \
  -H "Content-Type: image/png" \
  http://localhost:8080/api/media

curl --data-binary "@images/test_image_two.png" \
  --cookie "session=$LOCAL_LOGIN_TOKEN" \
  -H "Portfolio-File-Name: test_artifact_two.png" \
  -H "Content-Length: 61643" \
  -H "Content-Type: image/png" \
  http://localhost:8080/api/media

curl --data-binary "@images/test_image_three.png" \
  --cookie "session=$LOCAL_LOGIN_TOKEN" \
  -H "Portfolio-File-Name: test_artifact_three.png" \
  -H "Content-Length: 91922" \
  -H "Content-Type: image/png" \
  http://localhost:8080/api/media

curl --data-binary "@images/test_image_four.png" \
  --cookie "session=$LOCAL_LOGIN_TOKEN" \
  -H "Portfolio-File-Name: test_artifact_four.png" \
  -H "Content-Length: 1370100" \
  -H "Content-Type: image/png" \
  http://localhost:8080/api/media
