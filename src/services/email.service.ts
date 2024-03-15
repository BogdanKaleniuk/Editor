import axios from "axios";
import { IEmail } from "../pages/home/types";
import { queryClient } from "../Provider";

class EmailService {
  private URL = "http://localhost:3000/emails";

  async getEmail() {
    const { data } = await axios.get<IEmail[]>(this.URL);
    return data;
  }
  async sendEmail(text: string) {
    const { data } = await axios.post(this.URL, {
      text,
    });
    return data;
  }
  async deleteEmail(id: string) {
    await axios.delete(`${this.URL}/${id}`);
    await queryClient.refetchQueries(["email list"]);
  }
}

export const emailService = new EmailService();
