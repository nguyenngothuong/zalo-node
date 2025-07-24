![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-zalo-nnt

Node dành riêng cho n8n này được thiết kế hoạt động hoàn toàn bên trong instance n8n của bạn. Không cần sử dụng API của bên thứ ba hay phụ thuộc ngoại vi nào — chỉ có sự tự động hóa quy trình thuần túy, đảm bảo dữ liệu của bạn luôn được giữ riêng tư và an toàn.

Node này mô phỏng trình duyệt để tương tác trực tiếp với Zalo Web, cho phép tự động hóa liền mạch ngay trong n8n. Đây là dự án mã nguồn mở, mở rộng cơ hội cho cộng đồng cùng đóng góp ý kiến và phát triển thêm các tính năng mới, nhằm xây dựng hệ thống tự động hóa Zalo tiên tiến, hiệu quả và an toàn hơn.

## 🚀 Các cải tiến mới trong phiên bản 0.6.15

### 🎉 Tính năng mới (v0.6.15)
- **HEIC to JPEG conversion**: Tự động convert file HEIC/HEIF sang JPEG trước khi gửi
  - Sử dụng thư viện `heic-convert` (pure JavaScript, hoạt động tốt trong Docker)
  - Chất lượng JPEG output: 90%
  - Tự động xóa file HEIC gốc sau khi convert
  - Enhanced logging với prefix `[HEIC]` để dễ debug

### 🔧 Sửa lỗi quan trọng (v0.6.10)
- **Fix ZaloGroup limit issue**: Sửa lỗi limit parameters không hoạt động đúng cách
  - `getAllGroups`: Giờ đã respect limit parameter, chỉ trả về đúng số lượng groups theo yêu cầu
  - `getGroupMembers`: Áp dụng limit cho TẤT CẢ member arrays (members, admins, currentMems, updateMems)
- **Enhanced response metadata**: Thêm thông tin `totalGroups`, `limitedToCount`, `actualReturnedCount` để theo dõi

### 🔧 Các sửa lỗi từ v0.6.8-0.6.9
- **Fix JPEG file extension handling**: Sửa lỗi file .JPEG (uppercase) không gửi được
- **Fix PDF/file response errors**: Sửa lỗi "node execution output incorrect data" khi gửi PDF
- **File type validation**: Thêm warnings cho file types không được Zalo hỗ trợ hoàn toàn

### ✨ Tính năng từ v0.6.6
- **Gửi nhiều ảnh/file cùng lúc**: ZaloSendMessage hỗ trợ gửi nhiều URL ảnh/file trong một tin nhắn
- **Credential system được cải thiện**: Interface rõ ràng hơn, tránh nhầm lẫn
- **Simplified QR Login**: Chỉ cần n8n API credentials

## 💝 Ủng hộ tác giả

Nếu **node** này giúp bạn tiết kiệm thời gian hoặc giải quyết được vấn đề khó nhằn, hãy cân nhắc ủng hộ tôi hoặc đơn giản là nhấn **★ Star** cho dự án.

**Donate**: MB Bank - **0816226086** - Nguyễn Ngô Thượng

Sự động viên nhỏ ấy sẽ tiếp thêm năng lượng để mình tiếp tục duy trì, cập nhật và phát triển thêm nhiều tính năng hữu ích hơn nữa.  
Cám ơn bạn rất nhiều! 💛

## 👨‍💻 Tác giả
- **Nguyễn Ngô Thượng** - Maintainer & Developer
- Original work by Dương Đình Trung - ChickenAI Team

## 📦 Hướng dẫn cài đặt

### Community Nodes (Khuyến nghị)

Đối với người dùng n8n v0.187+, bạn có thể cài đặt node này trực tiếp từ bảng Community Nodes trong trình soạn thảo n8n.

1. Mở trình soạn thảo n8n của bạn
2. Vào **Settings > Community Nodes**
3. Tìm kiếm **"n8n-nodes-zalo-nnt"**
4. Nhấp vào **Install**
5. Tải lại trình soạn thảo

### Cài đặt thủ công

```bash
cd YOUR_N8N_INSTALLATION_DIRECTORY
npm install n8n-nodes-zalo-nnt
```

## 🔧 Available Nodes

### 1. 🔐 Zalo Login By QR
Node cho phép đăng nhập vào Zalo thông qua mã QR và tự động tạo credentials.

**Yêu cầu:**
- n8n API credentials (API Key + Instance URL)

**Tính năng:**
- QR code login đơn giản
- Tự động tạo Zalo credentials sau khi đăng nhập thành công
- Không cần nhập thủ công cookie, IMEI, User Agent

### 2. 👥 Zalo Group
Node quản lý các hoạt động nhóm.

**Operations:**
- `createGroup`: Tạo nhóm mới
- `getGroupInfo`: Lấy thông tin nhóm
- `addGroupDeputy`: Thêm phó nhóm
- `addUserToGroup`: Thêm thành viên
- `changeGroupAvatar`: Đổi avatar nhóm
- `changeGroupName`: Đổi tên nhóm
- **🔧 `getGroupMembers`**: Lấy danh sách thành viên (hỗ trợ limit cho tất cả member types)
- **🔧 `getAllGroups`**: Lấy tất cả nhóm (hỗ trợ limit số lượng groups trả về)
- `removeUserFromGroup`: Xóa thành viên
- `createNote`: Tạo ghi chú nhóm

**Tính năng limit mới:**
- Limit parameters giờ hoạt động chính xác 100%
- Response bao gồm metadata: `totalGroups`, `limitedToCount`, `actualReturnedCount`

### 3. 👤 Zalo User
Node quản lý người dùng và bạn bè.

**Operations:**
- `acceptFriendRequest`: Chấp nhận lời mời kết bạn
- `sendFriendRequest`: Gửi lời mời kết bạn
- `blockUser`: Chặn người dùng
- `unblockUser`: Bỏ chặn người dùng
- `changeAccountAvatar`: Đổi ảnh đại diện
- `changeAccountSetting`: Thay đổi cài đặt tài khoản
- `getUserInfo`: Lấy thông tin người dùng
- `getAllFriends`: Lấy danh sách bạn bè
- `findUser`: Tìm kiếm người dùng qua số điện thoại

### 4. 💬 Zalo Send Message
Node gửi tin nhắn tới người dùng hoặc nhóm.

**Features:**
- Gửi tin nhắn văn bản
- **🆕 Gửi nhiều ảnh/file cùng lúc**: 
  - Hỗ trợ comma-separated URLs: `url1,url2,url3`
  - Hỗ trợ JSON array: `["url1","url2","url3"]`
- **🔧 File extension support**: Hỗ trợ tất cả file formats (.jpg, .JPEG, .png, .PNG, .pdf, etc.)
- **🎉 HEIC/HEIF support**: Tự động convert HEIC/HEIF sang JPEG (v0.6.15+)
- Gửi file từ URL với tự động chuẩn hóa extension
- Quote tin nhắn
- Mention người dùng
- Proxy support

### 5. 📨 Zalo Message Trigger
Node lắng nghe và xử lý các sự kiện tin nhắn.

**Events:**
- Tin nhắn mới
- Tin nhắn nhóm
- Thay đổi trạng thái tin nhắn

### 6. 👫 Zalo Friend Trigger
Node lắng nghe các sự kiện bạn bè.

### 7. 📊 Zalo Poll
Node tạo và quản lý bình chọn.

### 8. 🏷️ Zalo Tag
Node quản lý tag cho contacts.

## ⚠️ Lưu ý quan trọng

**Vui lòng đọc kỹ trước khi sử dụng:**

Việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.

## 🙏 Cảm ơn

We would like to thank **ZCA-JS** for their excellent work on the core library that makes this integration possible.

## 📄 License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

---

⭐ **Don't forget to star this repo if it helped you!**