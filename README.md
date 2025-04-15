![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-zalo-tools
Node dành riêng cho n8n này được thiết kế hoạt động hoàn toàn bên trong instance n8n của bạn. Không cần sử dụng API của bên thứ ba hay phụ thuộc ngoại vi nào — chỉ có sự tự động hóa quy trình thuần túy, đảm bảo dữ liệu của bạn luôn được giữ riêng tư và an toàn.

Node này mô phỏng trình duyệt để tương tác trực tiếp với Zalo Web, cho phép tự động hóa liền mạch ngay trong n8n. Đây là dự án mã nguồn mở, mở rộng cơ hội cho cộng đồng cùng đóng góp ý kiến và phát triển thêm các tính năng mới, nhằm xây dựng hệ thống tự động hóa Zalo tiên tiến, hiệu quả và an toàn hơn.


## Hướng dẫn cài đặt node này:

**Community Nodes (Khuyến nghị)**

Đối với người dùng n8n v0.187+, bạn có thể cài đặt node này trực tiếp từ bảng Community Nodes trong trình soạn thảo n8n.

1.  Mở trình soạn thảo n8n của bạn.
2.  Vào Settings > Community Nodes.
3.  Tìm kiếm "n8n-nodes-zalo-tools".
4.  Nhấp vào Install.
5.  Tải lại trình soạn thảo.

**Cài đặt thủ công**

Bạn cũng có thể cài đặt node này theo cách thủ công:

```
cd YOUR_N8N_INSTALLATION_DIRECTORY
npm install n8n-nodes-zalo-tools
```

## Available Nodes

This package contains the following nodes (see the `nodes` directory for details):

 ## Các Node Hỗ Trợ

### ZaloAcceptFriendRequest
- Chấp nhận yêu cầu kết bạn từ người dùng Zalo khác
- Yêu cầu: ID người gửi yêu cầu kết bạn

### ZaloAddGroupDeputy
- Thêm phó quản trị viên cho nhóm Zalo
- Yêu cầu: ID nhóm và ID người dùng

### ZaloAddUserToGroup
- Thêm người dùng vào nhóm Zalo
- Yêu cầu: ID nhóm và ID người dùng

### ZaloBlockUser
- Chặn người dùng trên Zalo
- Yêu cầu: ID người dùng cần chặn

### ZaloChangeGroupAvatar
- Thay đổi ảnh đại diện nhóm Zalo
- Yêu cầu: ID nhóm và URL ảnh mới

### ZaloChangeGroupName
- Thay đổi tên nhóm Zalo
- Yêu cầu: ID nhóm và tên mới

### ZaloCreateGroup
- Tạo nhóm mới trên Zalo
- Yêu cầu: Tên nhóm và danh sách thành viên

### ZaloFindUserInformationByPhoneNumber
- Tìm thông tin người dùng qua số điện thoại
- Yêu cầu: Số điện thoại cần tìm

### ZaloGetAllFriends
- Lấy danh sách tất cả bạn bè
- Trả về: Danh sách bạn bè với thông tin chi tiết

### ZaloGetAllGroups
- Lấy danh sách tất cả nhóm
- Trả về: Danh sách nhóm với thông tin chi tiết

### ZaloGetGroupInfo
- Lấy thông tin chi tiết của nhóm
- Yêu cầu: ID nhóm
- Trả về: Thông tin nhóm, thành viên, quản trị viên

### ZaloGetGroupMembers
- Lấy danh sách thành viên trong nhóm
- Yêu cầu: ID nhóm
- Trả về: Danh sách thành viên với thông tin chi tiết

### ZaloGetStickers
- Lấy danh sách sticker có sẵn
- Trả về: Danh sách sticker với ID và thông tin

### ZaloGetUserInfo
- Lấy thông tin chi tiết của người dùng
- Yêu cầu: ID người dùng
- Trả về: Thông tin cá nhân, trạng thái, v.v.

### ZaloLoginByQR
- Đăng nhập Zalo bằng mã QR
- Tạo mã QR và chờ quét để đăng nhập

### ZaloMessageTrigger
- Kích hoạt workflow khi nhận tin nhắn Zalo
- Hỗ trợ các loại tin nhắn: text, image, voice, sticker, file

### ZaloRemoveUserFromGroup
- Xóa người dùng khỏi nhóm
- Yêu cầu: ID nhóm và ID người dùng

### ZaloSendMessage
- Gửi tin nhắn trên Zalo
- Hỗ trợ: tin nhắn văn bản, hình ảnh, file

### ZaloSendSticker
- Gửi sticker trên Zalo
- Yêu cầu: ID sticker và ID người nhận

### ZaloUnblockUser
- Bỏ chặn người dùng trên Zalo
- Yêu cầu: ID người dùng cần bỏ chặn

## Warning and Thanks

**Please read this carefully before using the Zalo nodes:**

Lưu ý: việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.

We would like to thank ZCA-JS for their work on this library.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
