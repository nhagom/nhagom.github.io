import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isChatbotVisible = false;
  messages = [{ sender: 'chatbot', content: 'Tôi có thể giúp gì cho bạn?' }];
  userInput = '';

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }


  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', content: this.userInput.trim() });
      this.userInput = '';
      this.handleBotResponse();
      // Add your logic to handle chatbot responses here
    }
  }
  handleBotResponse(): void {
    const userMessage = this.messages[this.messages.length - 1].content.toLowerCase();
    let botResponse = '';

    if (userMessage === 'xin chào') {
      botResponse = 'Chào bạn!';
    } else if (userMessage === 'chào') {
      botResponse = 'Chào bạn!';
    } else if (userMessage === 'lê anh tài') {
      botResponse = 'Vâng tôi biết, kui Tài rất thú';
    } else if (userMessage === 'nguyễn hà khánh yên') {
      botResponse = 'Waooo tất nhiên tôi biết, Yên rất xinh đẹp dễ thương lại còn học giỏi';
    } else if (userMessage === 'nguyễn thị hồng thanh') {
      botResponse = '....';
    } else if (userMessage === 'phạm ngọc hiền') {
      botResponse = '!!!!!';
    } else if (userMessage === 'bạn tên gì?') {
      botResponse = 'Mình tên là Chatbot.';
    } else if (userMessage === 'bạn tên gì') {
      botResponse = 'Mình tên là Chatbot.';
    } else if (userMessage === 'bạn làm gì được?') {
      botResponse = 'Mình có thể giúp bạn trả lời những câu hỏi đơn giản.';
    } else if (userMessage === 'bạn có thể giúp gì cho tôi?') {
      botResponse = 'Mình có thể giúp bạn trả lời những câu hỏi đơn giản.';
    } else if (userMessage === 'trả lời giúp tôi') {
      botResponse = 'Mình có thể giúp bạn trả lời những câu hỏi như: \n1. Thời gian giao hàng trung bình là bao lâu? \n2. Các chính sách đổi trả hoặc bảo hành sản phẩm? \n 3. Tư vấn về sản phẩm hoặc dịch vụ của Nhà Gốm \n 4. ' ;
    } else if (userMessage.endsWith('?')) {
      botResponse = 'Quý khách vui lòng đợi trong vài phút để chatbot liên hệ bộ phận chăm sóc khách hàng.';
    } else if (userMessage === 'cho tôi hỏi') {
      botResponse = 'Mình có thể giúp bạn trả lời những câu hỏi đơn giản.';
    } else if (userMessage === 'cho hỏi') {
      botResponse = 'Mình có thể giúp bạn trả lời những câu hỏi đơn giản.';
    } else if (userMessage === 'cho tao hỏi') {
      botResponse = 'Bạn cần lịch sự hơn trong việc đặt câu hỏi!';
    } else {
      botResponse = 'Xin lỗi, mình không hiểu bạn đang nói gì.';
    }

    this.messages.push({ sender: 'chatbot', content: botResponse });
  }
  fillOutMessage(message: string) {
    this.userInput = message;
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', content: this.userInput.trim() });
      this.userInput = '';
    }
    if (message === 'Giao hàng') {
      this.messages.push({
        sender: 'chatbot',
        content: 'Hình thức giao hàng của chúng tôi là giao hàng tận nơi cho khách hàng. Thời gian giao hàng từ 3-5 ngày kể từ khi đặt hàng.'
      });
    } else if (message === 'Chính sách đổi trả của cửa hàng') {
      this.messages.push({
        sender: 'chatbot',
        content: 'Chính sách đổi trả của cửa hàng là khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng, miễn là sản phẩm không bị hư hỏng và còn đầy đủ tem mác, hộp và phụ kiện đi kèm. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.'
      });
    } else if (message === 'Hỗ trợ kỹ thuật') {
      this.messages.push({
        sender: 'chatbot',
        content: 'Chúng tôi có đội ngũ hỗ trợ kỹ thuật sẵn sàng giúp đỡ khách hàng trong trường hợp sản phẩm gặp sự cố. Vui lòng liên hệ với chúng tôi để được hỗ trợ.'
      });
    } else if (message === 'Giá sản phẩm') {
      this.messages.push({
        sender: 'chatbot',
        content: 'Giá sản phẩm của chúng tôi được niêm yết trên website của cửa hàng. Nếu bạn có bất kỳ câu hỏi nào về giá cả, vui lòng liên hệ với chúng tôi để được tư vấn.'
      });
    }else if (message === 'Địa chỉ cửa hàng') {
      this.messages.push({
        sender: 'chatbot',
        content: 'Hiện tại cửa hàng chúng tôi đang có 5 địa chỉ trên toàn quốc, cụ thể: \n 1. Số nhà 10, đường Trần Phú, phường Hải Châu 1, quận Hải Châu, thành phố Đà Nẵng. \n 2. Số nhà 20, đường Hoàng Diệu, phường 7, quận Phú Nhuận, thành phố Hồ Chí Minh. \n 3. Số nhà 30, đường Lê Duẩn, phường Trần Hưng Đạo, thành phố Thanh Hóa. \n 4. Số nhà 40, đường Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều, thành phố Cần Thơ.\n 5. Số nhà 50, đường Nguyễn Chí Thanh, phường Bùi Thị Xuân, quận Hai Bà Trưng, thành phố Hà Nội.'
      });
    }
  }

  onBodyClick(event: MouseEvent): void {
    const chatbotContainer = document.querySelector('.chatbot-container');
    // Check if the clicked element is outside the chatbot container
    if (chatbotContainer && !chatbotContainer.contains(<Node>event.target)) {
      this.isChatbotVisible = false;
    }
  }
}
