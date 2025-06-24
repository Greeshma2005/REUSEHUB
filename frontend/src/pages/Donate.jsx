import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    customCategory: '',
    location: '',
    address: '',
    description: '',
    images: [],
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const [showFullImage, setShowFullImage] = useState({ visible: false, index: 0 });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images') {
      const selectedFiles = Array.from(files);
      const existingFiles = formData.images;

      if (existingFiles.length + selectedFiles.length > 3) {
        alert('You can upload a maximum of 3 images.');
        return;
      }

      const nonDuplicateFiles = selectedFiles.filter(
        (file) =>
          !existingFiles.some(
            (existing) => existing.name === file.name && existing.size === file.size
          )
      );

      if (nonDuplicateFiles.length !== selectedFiles.length) {
        alert('Some selected images are already uploaded.');
      }

      if (nonDuplicateFiles.length === 0) return;

      for (const file of nonDuplicateFiles) {
        if (file.size > 2 * 1024 * 1024) {
          alert(`Each image must be less than 2MB. '${file.name}' is too large.`);
          return;
        }
      }

      setFormData((p) => ({ ...p, images: [...p.images, ...nonDuplicateFiles] }));
      const newPreviews = nonDuplicateFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert('Please upload at least 1 image.');
      return;
    }

    const categoryToSend =
      formData.category === 'Others'
        ? formData.customCategory
        : formData.category;

    const data = new FormData();
    data.append('itemName', formData.itemName);
    data.append('category', categoryToSend);
    data.append('location', formData.location);
    data.append('address', formData.address);
    data.append('description', formData.description);
    formData.images.forEach((img) => data.append('images', img));

    fetch('http://localhost:5000/api/donations', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({
          itemName: '',
          category: '',
          customCategory: '',
          location: '',
          address: '',
          description: '',
          images: [],
        });
        setPreviewUrls([]);
        setShowFullImage({ visible: false, index: 0 });

        // Navigate to thank-you page
        navigate('/donation-success');
      })
      .catch(() => alert('Something went wrong!'));
  };

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4 sm:px-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-green-800 text-center">Donate an Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-green-700 font-medium">Item Name</label>
            <input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-700 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2 text-sm"
            >
              <option value="">Select a category</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {formData.category === 'Others' && (
            <div>
              <label className="block mb-1 text-green-700 font-medium">Specify Category</label>
              <input
                name="customCategory"
                value={formData.customCategory}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-green-700 font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-700 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border rounded px-4 py-2 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-green-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Like-new condition, gently used, etc."
              className="w-full border rounded px-4 py-2 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-green-700 font-medium">Upload 1–3 Photos</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleChange}
              multiple
              className="w-full border rounded px-3 py-2 text-sm bg-white"
            />

            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded border cursor-pointer"
                      onClick={() => setShowFullImage({ visible: true, index })}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedPreviews = [...previewUrls];
                        const updatedImages = [...formData.images];
                        updatedPreviews.splice(index, 1);
                        updatedImages.splice(index, 1);
                        setPreviewUrls(updatedPreviews);
                        setFormData((p) => ({ ...p, images: updatedImages }));
                        if (showFullImage.index === index) {
                          setShowFullImage({ visible: false, index: 0 });
                        }
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Donate Now
          </button>
        </form>
      </div>

      {/* Fullscreen Image Modal */}
      {showFullImage.visible && previewUrls[showFullImage.index] && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative">
            <img
              src={previewUrls[showFullImage.index]}
              alt="Full Preview"
              className="max-w-full max-h-[90vh] rounded"
            />
            <button
              onClick={() => setShowFullImage({ visible: false, index: 0 })}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 px-3 text-lg hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
