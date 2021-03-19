import React, {useState, useEffect} from "react";

import reactCSS from "reactcss";
import LinkItem from "./LinkItem";
import Message from "../ui/Message";
import ProfileService from "../../services/ProfileService";

import UserLinksService from "../../services/links/UserLinksService";

const UserLinkCard = () => {
  const [profile, setProfile] = useState({
    image: "",
    displayName: "",
    bio: "",
    primaryColor: "",
    backgroundColor: "",
  });
  const [userLinks, setUserLinks] = useState([]);
  const [message, setMessage] = useState(null);
  var styles = reactCSS({
    primaryColor: "",
    backgroundColor: "",
  });
  useEffect(() => {
    ProfileService.getProfile().then((data) => {
      setProfile(data);
    });

    UserLinksService.getUserLinks().then((data) => {
      setUserLinks(data.links);
    });
    styles = reactCSS({
      primaryColor: profile.primaryColor,
      backgroundColor: profile.backgroundColor,
    });
  }, []);

  return (
    <div
      className="flex min-h-full items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-6"
      styles={styles.backgroundColor}
    >
      <div className="max-w-xl w-full">
        <div className="px-8 py-6">
          {console.log(profile)}
          <img
            className="relative w-1/4 my-0 mx-auto rounded-full"
            src={profile.image.file}
            alt="User profile image"
          />
          <h1>@username</h1>
          <h4>
            The passage is attributed to an unknown typesetter in the 15th
            century
          </h4>
          <div>
            {userLinks.map((link, index) => (
              <React.Fragment key={index}>
                <div className="my-6">
                  <LinkItem
                    link={link}
                    primaryColor={profile.primaryColor}
                    backgroundColor={profile.backgroundColor}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLinkCard;
