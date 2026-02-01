import User from "../models/User.js";

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id);

  const itemIndex = user.cart.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity || 1;
  } else {
    user.cart.push({ product: productId, quantity: quantity || 1 });
  }

  await user.save();
  res.json({ message: "Added to cart", cart: user.cart });
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json({ message: "Added to wishlist", wishlist: user.wishlist });
};

// Get cart & wishlist
export const getProfileData = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("cart.product")
    .populate("wishlist");

  res.json(user);
};
