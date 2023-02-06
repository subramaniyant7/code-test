import React, { useState, useEffect } from "react";
import { Button, Space, Typography, Modal, Spin } from "antd";
import axios from "axios";
import { ApiPath } from "../../api/apiPath";
import {
  ProfileProps,
  ProfileInfo,
  ProfileInfoLoading,
  AuthorInfo,
  QuoteInfo,
} from "../../type";

const Profile: React.FC<ProfileProps> = () => {
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<ProfileInfo>({
    fullname: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [dataLoading, setDataLoading] = useState<ProfileInfoLoading>({
    author: true,
    quote: true,
  });

  const [author, setAuthor] = useState<AuthorInfo>({ authorId: "", name: "" });

  const [quote, setQuote] = useState<QuoteInfo>({
    quoteId: "",
    authorId: "",
    quote: "",
  });

  const getProfileApiResponse = async () => {
    await axios
      .get(ApiPath.AUTHOR_INFO)
      .then((res) => {
        if (res.data.success) {
          setDataLoading({ ...dataLoading, author: false });
          setAuthor(res.data.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
    await axios
      .get(ApiPath.QUOTE_INFO)
      .then((res) => {
        if (res.data.success) {
          setDataLoading({ author: false, quote: false });
          setQuote(res.data.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const showModal = () => {
    getProfileApiResponse();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(ApiPath.PROFILE)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="profile">
          <Space>
            <img className="profile-img" src={data?.avatar} alt="owl" />
            <div>
              <Title>Welcome, {data?.fullname}</Title>
              <Button type="primary" onClick={showModal}>
                Update
              </Button>
            </div>
          </Space>
          <p className="subtitle">
            [here is place for concatenated result from long running cell]
          </p>
        </div>
      )}

      {!dataLoading.author && (
        <div>
          Author Info :<p>Author Id: {author.authorId}</p>
          <p>Author Name: {author.name}</p>
        </div>
      )}

      {!dataLoading.quote && (
        <div>
          Quote Info :<p>Quote Id: {quote.quoteId}</p>
          <p>Author Id: {quote.authorId}</p>
          <p>Quote: {quote.quote}</p>
        </div>
      )}

      <Modal
        title="Requesting the quote"
        open={isModalOpen}
        footer={[<Button onClick={handleCancel}>Cancel</Button>]}
      >
        <p>
          step 1: Requesting author... {!dataLoading.author ? "Completed" : ""}
        </p>
        <p>
          step 2: Requesting quote... {!dataLoading.quote ? "Completed" : ""}
        </p>
      </Modal>
    </>
  );
};

export default Profile;
