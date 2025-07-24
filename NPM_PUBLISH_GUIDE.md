# NPM Publish Guide

## Chuẩn bị trước khi publish

### 1. Đăng nhập NPM
```bash
npm login --auth-type=web
```
Hoặc dùng lệnh cũ:
```bash
npm login
```
Nhập username, password, email và OTP (One Time Password) từ authenticator app.

### 2. Kiểm tra thông tin package
```bash
npm whoami
```
Xác nhận đã đăng nhập đúng account.

### 3. Kiểm tra version hiện tại
```bash
npm version
```

## Publish lên NPM

### 1. Build project
```bash
pnpm build
```

### 2. Tăng version (tùy chọn)
```bash
# Patch version (0.6.10 -> 0.6.11)
npm version patch

# Minor version (0.6.10 -> 0.7.0)
npm version minor

# Major version (0.6.10 -> 1.0.0)
npm version major
```

### 3. Publish
```bash
# Publish bình thường
npm publish

# Publish với OTP (nếu bật 2FA)
npm publish --otp=123456

# Publish với tag (nếu là beta/alpha)
npm publish --tag beta --otp=123456
```

**Lưu ý:** Thay `123456` bằng mã OTP 6 số từ authenticator app của bạn.

## Kiểm tra sau khi publish

### 1. Xem package trên NPM
```bash
npm view n8n-nodes-zalo-nnt
```

### 2. Kiểm tra version mới nhất
```bash
npm view n8n-nodes-zalo-nnt version
```

## Troubleshooting

### Lỗi "package already exists"
- Tăng version trong `package.json` trước khi publish
- Hoặc dùng `npm version patch/minor/major`

### Lỗi permission
- Kiểm tra đã đăng nhập đúng account
- Kiểm tra có quyền publish package này không

### Lỗi 2FA
- Nếu bật 2FA, dùng flag `--otp=XXXXXX` với mã từ authenticator app
- Hoặc npm sẽ prompt yêu cầu nhập OTP
- Mã OTP có hiệu lực trong 30 giây

## Quick Commands
```bash
# Full publish flow
pnpm build
npm version patch
npm publish --otp=123456

# Check published package
npm view n8n-nodes-zalo-nnt

# One-liner publish với OTP
npm publish --otp=$(read -p "Enter OTP: " otp; echo $otp)
```

## Lệnh publish với OTP
```bash
# Cách 1: Truyền OTP trực tiếp
npm publish --otp=123456

# Cách 2: Npm sẽ hỏi OTP
npm publish

# Cách 3: Interactive OTP input
npm publish --otp=$(read -s -p "Enter OTP: " otp; echo $otp)
```