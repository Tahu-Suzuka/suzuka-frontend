import React, { useState } from "react";
import Header from "../components/atoms/Header";
import ProfileSidebar from "../components/organisms/sidebar/ProfileSidebar";
import ProfileContent from "../components/organisms/ProfileContent";
import OrderContent from "../components/organisms/OrderContent";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState("profil");

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Header imageSrc="/images/product/header.png" title="Profil" />
      <div className="pt-10 px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pb-32">
          <ProfileSidebar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <div className="md:col-span-3">
            <div className="bg-white rounded-md shadow-md">
              {activeMenu === "profil" && <ProfileContent />}
            </div>
            {activeMenu === "pesanan" && <OrderContent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
