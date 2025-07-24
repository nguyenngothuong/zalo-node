# NPM Publish Guide

## Chuẩn bị trước khi publish

### 1. Đăng nhập NPM
```bash
npm login
```
Nhập username, password và email của NPM account.

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

# Publish với tag (nếu là beta/alpha)
npm publish --tag beta
```

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
- Nếu bật 2FA, nhập OTP khi được yêu cầu

## Quick Commands
```bash
# Full publish flow
pnpm build
npm version patch
npm publish

# Check published package
npm view n8n-nodes-zalo-nnt
```