const convertUser = (user: any): any => {
  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    googleId: user.googleId || "",
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default convertUser;
