import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Search, Send, Sticker, X } from "lucide-react";
import toast from "react-hot-toast";
import ZaloSticker from "./ZaloSticker";
import { useStickerStore } from "../store/useStickerStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { getCategories, categoriesStickers, key, setKey,setSelectedCategory,selectedCategory,stickers,getStickersByCategoryId,isStickersLoading,
    recentStickers,addRecentSticker,getRecentStickers } = useStickerStore();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    getCategories();
    getRecentStickers();
  }, []);

  useEffect(() => {
    if(selectedCategory){
      getStickersByCategoryId(selectedCategory.cid);
    }
  }, [selectedCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      console.log("image:", imagePreview);
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendSticker = async (sticker) => {

    if (!sticker) return;

    try {
      await sendMessage({
        text: "",
        image: null,
        emoji: sticker.url,
      });

      document.getElementById('sticker-modal').close();

      // Add to recent stickers
      addRecentSticker(sticker);
      // Clear form
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSearchSticker = async (e) => {
    e.preventDefault();
    getCategories();
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />


          {/* for stickers */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle`}
          >
            <Sticker size={20} onClick={() => document.getElementById('sticker-modal').showModal()} />
          </button>


          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>

      <dialog id="sticker-modal" className="modal">
        <div className="modal-box custom-scrollbar">
          <div role="tablist" className="tabs tabs-boxed mb-3">
            <div role="tablist" className="tabs tabs-boxed mb-3">
              <a
                role="tab"
                className={`tab ${selectedTab === 0 ? "tab-active" : ""}`}
                onClick={() => setSelectedTab(0)}
              >
                Categories
              </a>
              <a
                role="tab"
                className={`tab ${selectedTab === 1 ? "tab-active" : ""}`}
                onClick={() => setSelectedTab(1)}
              >
                Recent
              </a>
              <a
                role="tab"
                className={`tab ${selectedTab === 2 ? "tab-active" : ""}`}
                onClick={() => setSelectedTab(2)}
              >
                Stickers
              </a>
            </div>
          </div>
           {/* content for Categories */}
          {
            selectedTab === 0 && (
              <div className="h-[500px]">
                {/* input search */}
                <form onSubmit={handleSearchSticker} >
                  <label className="input input-bordered flex items-center gap-2 ">
                    <input type="text" value={key} onChange={(e) => setKey(e.target.value)} className="grow" placeholder="Search" />
                    <Search className="cursor-pointer" onClick={handleSearchSticker} size={20} />
                  </label>
                </form>

                <div className="grid grid-cols-4 gap-5 h-full overflow-y-auto custom-scrollbar">
                  {
                    categoriesStickers.map((category, i) => (
                      <div onClick={()=>{
                        setSelectedCategory(category);
                        setSelectedTab(2);
                      }} className="cursor-pointer text-center" key={i}>
                        <img className="w-full" src={category.img} alt={category.name} />
                        <h3 className="text-sm">{category.name}</h3>
                      </div>
                    ))
                  }
                  </div>
              </div>)
          }
          
          {/* content for  Recent*/}
          {
            selectedTab === 1 && (
              <div className="h-[500px] justify-center items-center">
                {
                  recentStickers.length === 0 && (
                    <p className="py-4">No recent stickers found</p>
                  )
                }
                {
                  recentStickers.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                      {
                        recentStickers.map((sticker, i) => (
                          <div onClick={()=>handleSendSticker(sticker)} className="cursor-pointer text-center" key={i}>
                            <ZaloSticker className={'w-full'} url={sticker.url} />
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            )
          }

          {/* content for  Stickers*/}
          {
            selectedTab === 2 && (
              <div className="h-[500px] flex justify-center items-center">
                {
                  isStickersLoading && (
                    <span className="loading loading-spinner loading-lg"></span>
                  )
                }
                {
                  !isStickersLoading && stickers.length === 0 && (
                    <p className="py-4">No have stickers, please try again</p>
                  )
                }
               {
                  !isStickersLoading && stickers.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                      {
                        stickers.map((sticker, i) => (
                          <div onClick={()=>handleSendSticker(sticker)} className="cursor-pointer text-center" key={i}>
                            <ZaloSticker className={'w-full'} url={sticker.url} />
                          </div>
                        ))
                      }
                    </div>
                  )
               }
              </div>
            )
          }

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
};
export default MessageInput;