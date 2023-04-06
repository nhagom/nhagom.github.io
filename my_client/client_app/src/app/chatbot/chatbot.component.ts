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
      this.userInput = '';}
    this.messages.push({sender:'chatbot', content:"Hình thức giao hàng của chúng tôi là giao hàng tận nơi cho khách hàng. Thời gian giao hàng từ 3-5 ngày kể từ khi đặt hàng."})
  }

  onBodyClick(event: MouseEvent): void {
    const chatbotContainer = document.querySelector('.chatbot-container');
    // Check if the clicked element is outside the chatbot container
    if (chatbotContainer && !chatbotContainer.contains(<Node>event.target)) {
      this.isChatbotVisible = false;
    }
  }
}
