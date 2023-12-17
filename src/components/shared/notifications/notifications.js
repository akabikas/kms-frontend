import React, { useEffect, useState } from "react";

import SessionStorageService from "../../../services/sessionStorage";
import MenuData from "../../../assets/data/menu.json";
import Layout from "../layout/component";
import getAllNotifications from "../../../libs/notifications/getNotifications";
import { Link } from "react-router-dom";
import updateNotification from "../../../libs/notifications/updateNotifications";

export default function Notifications() {
  const user = SessionStorageService.getItem("user");
  const token = SessionStorageService.getItem("token");
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getAllNotifications(
          token,
          user._id
        );
        if (success) {
          setNotifications(data.notifications);
        } else {
          console.error("Error fetching notifications:", error);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
    return () => {};
  }, [notifications]);

  function getTimeDifferenceString(notificationTime) {
    const currentTime = new Date();
    const notificationDate = new Date(notificationTime);

    const differenceInSeconds = Math.floor(
      (currentTime - notificationDate) / 1000
    );

    if (differenceInSeconds < 60) {
      return "Just now";
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }

  const updateNotificationStatus = async (ID, status) => {
    try {
      const { success, data, error } = await updateNotification(
        token,
        user._id,
        ID,
        status
      );
      if (success) {
        setNotifications(data.notifications);
        const { success, data, error } = await getAllNotifications(
          token,
          user._id
        );
        if (success) {
          setNotifications(data.notifications);
        } else {
          console.error("Error fetching notifications:", error);
        }
      } else {
        console.error("Error updating notifications:", error);
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  return (
    <>
      <Layout
        MenuData={
          user.role === "admin"
            ? MenuData.admin
            : user.role === "employee"
            ? MenuData.employee
            : MenuData.client
        }
      >
        <section className="all-notifications">
          <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-xs font-bold leading-6 text-gray-900">
              All notifications
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {notifications &&
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-xxx font-bold leading-6 text-gray-900">
                        {notification.title}
                      </p>
                      <p
                        className={`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-[12px] font-medium ${
                          notification.status === "Read"
                            ? "ring-1 ring-inset text-gray-600 bg-gray-50 ring-gray-500/1"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {notification.status}
                      </p>
                    </div>
                    <p className="w-full text-xxxs mt-2">
                      {notification.description}
                    </p>
                    <div className="mt-2 flex items-center gap-x-2 text-xxxs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                        <time>
                          {getTimeDifferenceString(
                            new Date(notification.createdAt)
                          )}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <div className="relative flex-none">
                      <button
                        type="button"
                        className="-m-2.5 block p-2.5 text-primary hover:underline text-xxxs bg-transparent"
                        id="options-menu-2-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() =>
                          updateNotificationStatus(
                            notification._id,
                            notification.status === "Read" ? "Unread" : "Read"
                          )
                        }
                      >
                        Mark as{" "}
                        <span>
                          {notification.status === "Read" ? "unread" : "read"}
                        </span>
                      </button>
                    </div>
                    <Link
                      to={`/projects/${notification.project}`}
                      className="hidden rounded-md bg-white px-2.5 py-1.5 text-xxxs font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                    >
                      View project
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </Layout>
    </>
  );
}
