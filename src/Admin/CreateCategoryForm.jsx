// components/Admin/CreateCategoryForm.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../../../services/operations/courseDetailsAPI";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { setCourseCategories } from "../../../../../slices/courseSlice"; // Assuming you have this action
import { toast } from "react-hot-toast";
import "./CreateCategoryForm.css"; // Optional: Add your CSS styles

export default function CreateCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const categoryData = {
      name: name.trim(),
      description: description.trim(),
    };

    setLoading(true);
    const createdCategory = await createCategory(categoryData, token);
    setLoading(false);

    if (createdCategory) {
      // Refresh the categories list after creation
      const categories = await fetchCourseCategories();
      dispatch(setCourseCategories(categories));
      // Reset form fields
      setName("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleCreateCategory} className="create-category-form">
      <h3>Create New Category</h3>
      <div className="form-group">
        <label htmlFor="categoryName">Category Name <sup>*</sup></label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryDescription">Category Description</label>
        <textarea
          id="categoryDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Category"}
      </button>
    </form>
  );
}
