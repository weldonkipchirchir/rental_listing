let domain = "http://localhost:8000/api";
// let domain = "http://172.23.32.1:8000/api";

export async function loginUser(creds) {
    const res = await fetch(`${domain}/user/login`, {
        method: "post",
        body: JSON.stringify(creds)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    
    return data
}
export async function loginAdmin(creds) {
    const res = await fetch(`${domain}/admin/login`, {
        method: "post",
        body: JSON.stringify(creds)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function registerAdmin(creds) {
    const res = await fetch(`${domain}/admin/register`, {
        method: "post",
        body: JSON.stringify(creds)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function sendAdminResetPassword(formData) {
    const res = await fetch(`${domain}/admin/forgot-password`, {
        method: "post",
        body: JSON.stringify(formData)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function sendUserResetPassword(formData) {
    const res = await fetch(`${domain}/user/forgot-password`, {
        method: "post",
        body: JSON.stringify(formData)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function registerUser(creds) {
    const res = await fetch(`${domain}/user/register`, {
        method: "post",
        body: JSON.stringify(creds)
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function createListing(formData) {
  const res = await fetch( `${domain}/listing/create`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.error,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
  
export async function adminListings() {
    const res = await fetch(`${domain}/listing/admin/listing`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  
export async function uppdateAdminListing(id, formData) {
    const res = await fetch(`${domain}/listing/admin/listing/update/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  
  export async function adminBookings() {
    const res = await fetch(`${domain}/admin/bookings`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function listings() {
    const res = await fetch(`${domain}/listing/`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function loggedInUserListings() {
    const res = await fetch(`${domain}/listing/user`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getBookings() {
    const res = await fetch(`${domain}/user/bookings`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function views(id) {
    const res = await fetch(`${domain}/listings/${id}/views`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function createBooking(formData) {
    const res = await fetch(  `${domain}/user/bookings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function postReview(formData) {
    const res = await fetch(`${domain}/user/review`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function updateAdmin(formData) {
    const res = await fetch(`${domain}/admin/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function updateUser(formData) {
    const res = await fetch(`${domain}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function updateBookingStatus( id, status) {
    const res = await fetch(`${domain}/admin/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function createFavorite(formData) {
    const res = await fetch(`${domain}/user/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    if (!res.ok) {
      const data = await res.json();
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return res.json(); 
  }
  
  export async function getFavorite() {
    const res = await fetch(`${domain}/user/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const data = await res.json();
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return res.json(); 
  }
  
  export async function deleteFavorite(id) {
    const res = await fetch(`${domain}/user/favorite/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const data = await res.json();
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return res.json(); 
  }
  
  export async function getBookmark() {
    const res = await fetch(`${domain}/user/favorites`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function getAdminData() {
    const res = await fetch(`${domain}/listing/admin/listing/data`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function updateListingStatus( id, formData) {
    const res = await fetch(`${domain}/listing/listing/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getSearchList(formData) {
    const res = await fetch(`${domain}/listing/search?keyword=${formData}`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function getSearchFavorite(formData) {
    const res = await fetch(`${domain}/favorite/search?keyword=${formData}`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function getUserNotifications() {
    const res = await fetch(`${domain}/user/notification`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function getAdminNotifications() {
    const res = await fetch(`${domain}/admin/notification`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function getUserUnreadNotifications() {
    const res = await fetch(`${domain}/user/notification/unread`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getAdminUnreadNotifications() {
    const res = await fetch(`${domain}/admin/notification/unread`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getAdminSentNotifications() {
    const res = await fetch(`${domain}/admin/notification/sent`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getUserSentNotifications() {
    const res = await fetch(`${domain}/user/notification/sent`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function postNotifications( formData){
    const res = await fetch(`${domain}/admin/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function postAdminNotifications( formData){
    const res = await fetch(`${domain}/user/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function updateNotification(id, formData){
    const res = await fetch(`${domain}/user/notification/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function updateAdminNotification(id, formData){
    const res = await fetch(`${domain}/admin/notification/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getListingById(id) {
    const res = await fetch(`${domain}/listing/${id}`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getStats() {
    const res = await fetch(`${domain}/admin/stats`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getUserPaymentRecords() {
    const res = await fetch(`${domain}/user/payment-records`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function getAdminPaymentRecords() {
    const res = await fetch(`${domain}/admin/payment-records`, {
      method: "GET",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function deleteBooking(id) {
    const res = await fetch(`${domain}/user/bookings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }
  export async function deleteAdminListing(id) {
    const res = await fetch(`${domain}/listing/admin/listing/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }

  export async function updateUserBooking(id) {
    const res = await fetch(`${domain}/user/bookings/${id}`, {
      method: "PUT",
      credentials: "include",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw {
        message: data.error,
        statusText: res.statusText,
        status: res.status,
      };
    }
  
    return data;
  }