import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: {
        values: ["new", "like-new", "good", "fair", "poor"],
        message: "Condition must be one of: new, like-new, good, fair, poor",
      },
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+/.test(v);
          },
          message: "Image URL must be a valid URL",
        },
      },
    ],
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      zipCode: {
        type: String,
        required: [true, "Zip code is required"],
        trim: true,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for search functionality
itemSchema.index({ title: "text", description: "text" });
itemSchema.index({ category: 1 });
itemSchema.index({ condition: 1 });
itemSchema.index({ price: 1 });
itemSchema.index({ "location.city": 1 });

const Item = mongoose.model("Item", itemSchema);

export default Item;
