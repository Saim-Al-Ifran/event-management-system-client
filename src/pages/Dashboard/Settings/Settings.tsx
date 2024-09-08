import { Button } from "@material-tailwind/react";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateSettingsMutation, useGetSettingsQuery } from "../../../features/settings/settingsApi"; 
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { SettingsState } from "../../../types/types";

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
  const { data: settingsData, isLoading, isError } = useGetSettingsQuery();  
  const [createSettings,{isLoading:isFecthing,isError:hasError,isSuccess,error}] = useCreateSettingsMutation();

  
  useEffect(() => {
    if (settingsData) {
      setSettings({
        siteName: settingsData.siteName || "",
        siteLogo: null, // File type won't be available from the API
        footerDescription: settingsData.footerDescription || "",
        socialLinks: {
          facebook: settingsData.socialLinks.facebook || "",
          twitter: settingsData.socialLinks.twitter || "",
          instagram: settingsData.socialLinks.instagram || "",
        },
      });

     
      if (settingsData.siteLogo) {
        setPreview(settingsData.siteLogo); 
      }
    }
  }, [settingsData]);
  
  useEffect(()=>{
         if(isSuccess){
              toast.success("Successfully Updated settings data");
         }
         if(hasError){
              toast.error(error?.data?.message);
              console.log(error)
         }
  },[isSuccess,hasError])
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
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(settings.socialLinks.facebook)
    const formData = new FormData();
    formData.append("siteName", settings.siteName);
    if (settings.siteLogo) {
      formData.append("image", settings.siteLogo);  
    }
    formData.append("footerDescription", settings.footerDescription);
    formData.append("facebook", settings.socialLinks.facebook);
    formData.append("twitter", settings.socialLinks.twitter);
    formData.append("instagram", settings.socialLinks.instagram);

     await(createSettings(formData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)} />
      </div>
    );
  }

  if (isError) return <p>Failed to load settings.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

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

       
        <div>
          <Button
           loading={isFecthing} 
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
