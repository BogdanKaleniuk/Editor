import React from "react";
import styles from "./EmailList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
import parse from "html-react-parser";

export function EmailList() {
  const { data } = useQuery({
    queryKey: ["email list"],
    queryFn: () => emailService.getEmail(),
  });
  return (
    <div className={styles.list}>
      {data?.map((email) => (
        <div key={email.text}>{parse(email.text)} </div>
      ))}
    </div>
  );
}
