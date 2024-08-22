import { Button } from "@material-tailwind/react";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

interface SettingsState {
  siteName: string;
  siteLogo: File | null;
  footerDescription: string;
  socialLinks: SocialLinks;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    siteName: "",
    siteLogo: null,
    footerDescription: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in settings.socialLinks) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        socialLinks: {
          ...prevSettings.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        siteLogo: file,
      }));
      setPreview(URL.createObjectURL(file)); // Set the preview URL for the image
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., saving the data
    console.log(settings);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Site Name */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter site name"
            />
          </div>

          {/* Site Logo */}
          <div>
            <label htmlFor="siteLogo" className="block text-sm font-medium text-gray-700">
              Site Logo
            </label>
            <input
              type="file"
              name="siteLogo"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {/* Image Preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Site Logo Preview"
                  className="h-32 w-32 object-contain border rounded"
                />
              </div>
            )}
          </div>

          {/* Footer Description */}
          <div className="sm:col-span-2">
            <label htmlFor="footerDescription" className="block text-sm font-medium text-gray-700">
              Footer Description
            </label>
            <textarea
              name="footerDescription"
              value={settings.footerDescription}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter footer description"
            />
          </div>

          {/* Social Links - Facebook */}
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              value={settings.socialLinks.facebook}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Facebook URL"
            />
          </div>

          {/* Social Links - Twitter */}
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              value={settings.socialLinks.twitter}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Twitter URL"
            />
          </div>

          {/* Social Links - Instagram */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="url"
              name="instagram"
              value={settings.socialLinks.instagram}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Instagram URL"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div >
          <Button
            type="submit"
            className="w-full"
            color="blue-gray"
            {...(undefined as any)}
          >
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};


export default Settings;
