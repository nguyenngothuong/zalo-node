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

*   ZaloLoginByQR
*   ZaloSendMessage
*   ZaloAddGroupDeputy
*   ZaloAcceptFriendRequest
*   ZaloAddReaction
*   ZaloFindUserInformationByPhoneNumber
*   ZaloGetGroupInfo

## Warning and Thanks

**Please read this carefully before using the Zalo nodes:**

Lưu ý: việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.

We would like to thank ZCA-JS for their work on this library.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
