import React from "react";
import styles from "./EmailList.module.scss";
// import { useQuery } from "@tanstack/react-query";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { queryClient } from "../../Provider";
import { emailService } from "../../services/email.service";
import parse from "html-react-parser";

export function EmailList() {
  // const queryClient = new QueryClient();

  const { data } = useQuery({
    queryKey: ["email list"],
    queryFn: () => emailService.getEmail(),
  });

  const deleteEmailMutation = useMutation({
    mutationFn: (id: string) => emailService.deleteEmail(id),
    onSuccess: () => {
      queryClient.invalidateQueries("email list");
    },
  });

  const handleDelete = (id: number) => {
    deleteEmailMutation.mutate(id);
  };

  return (
    <div className={styles.list}>
      {data?.map((email) => (
        <div key={email.text}>
          {parse(email.text)}
          <button onClick={() => handleDelete(email.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
