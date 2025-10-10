"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function SellPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userName, setUserName] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const user = userData?.user;
      console.log(user?.user_metadata?.full_name);
      setUserName(user?.user_metadata?.full_name);
      setUserId(user?.id);
    }
    fetchData();
  }, []);

  console.log("User Name:", userName); // Log the user name to verify
  console.log("User ID:", userId); // Log the user ID to verify

  const [used, setUsed] = useState("");
  const [type, setType] = useState("");
  const [uni, setUni] = useState("");

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: type,
    des: "",
    used: used,
    uni: uni,
    // uploadedById: id,
    // uploadedByName: user?.user_metadata?.full_name || "",
  });
  console.log(type, used, uni);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");

    setLoading(true);
    try {
      // ✅ 1. Compress the image
      console.log("⏳ Compressing image...");
      const compressed = await imageCompression(imageFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      // ✅ 2. Get ImageKit authentication params from backend
      console.log("⏳ Getting ImageKit auth...");
      const { data: auth } = await axios.get("/api/imagekit-auth");
      console.log("✅ Auth params:", auth);

      // ✅ 3. Upload to ImageKit
      console.log("⏳ Uploading to ImageKit...");
      const uploadForm = new FormData();
      uploadForm.append("file", compressed);
      uploadForm.append("fileName", formData.name || "item-image");
      uploadForm.append("signature", auth.signature);
      uploadForm.append("expire", auth.expire);
      uploadForm.append("token", auth.token);
      uploadForm.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
      );

      const uploadRes = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        uploadForm
      );
      console.log("✅ ImageKit response:", uploadRes.data);

      const imageUrl = uploadRes.data.url;
      console.log("✅ Image URL:", imageUrl);

      // ✅ 4. Insert item into Supabase (or any database)
      console.log("⏳ Inserting into Supabase...");
      const { error } = await supabase.from("items").insert([
        {
          name: formData.name,
          price: formData.price,
          type: formData.type,
          des: formData.des,
          used: formData.used,
          uni: formData.uni,
          images: imageUrl,
          uploadById: userId,
          uploadedByName: userName || "",
        },
      ]);

      // if (error) throw error;
      if (error) toast.error("Error inserting item: " + error.message);
      // alert("✅ Item listed successfully!");
      toast.success("Item listed successfully!");
      router.push("/buy");
    } catch (err: any) {
      console.error("❌ Error details:", err.response?.data || err.message);
      toast.error("❌ Error uploading item – check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-24 p-6 rounded-2xl space-y-4">
      <h1 className="text-3xl font-bold text-center tracking-tight">
        Sell an Item
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Nike Air Max"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {uni === "" ? "Select your university" : uni}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Your University</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={uni}
              // onValueChange={setType}
              onValueChange={(value) => {
                setUni(value);
                setFormData((prev) => ({ ...prev, uni: value }));
              }}
            >
              <DropdownMenuRadioItem value="Fut Minna">
                Fut Minna
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Unilag" disabled>
                Unilag (soon)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Unilorin" disabled>
                Unilorin (soon)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Label htmlFor="price">Price (₦)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g. 15000"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div>
          <Label htmlFor="type">Category</Label>
          <Input
            id="type"
            name="type"
            placeholder="e.g. Shoes"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {type === "" ? "Select product type" : type}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Product Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={type}
              // onValueChange={setType}
              onValueChange={(value) => {
                setType(value);
                setFormData((prev) => ({ ...prev, type: value }));
              }}
            >
              <DropdownMenuRadioItem value="Cloth">Cloth</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Gadget">
                Gadget
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Book">Book</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Shoe">Shoe</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Electronics">
                Electronics
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Other">Other</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Label htmlFor="des">Description</Label>
          <Textarea
            id="des"
            name="des"
            placeholder="Briefly describe your item"
            value={formData.des}
            onChange={handleChange}
          />
        </div>

        {/* <div>
          <Label htmlFor="used">Used or New?</Label>
          <Textarea
            id="used"
            name="used"
            placeholder="Briefly describe your item"
            value={formData.used}
            onChange={handleChange}
          />
        </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {used === "" ? "Is this product used?" : used}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Is this product used?</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={used}
              // onValueChange={setUsed}
              onValueChange={(value) => {
                setUsed(value);
                setFormData((prev) => ({ ...prev, used: value }));
              }}
            >
              <DropdownMenuRadioItem value="Used">
                Yes, it is used
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="New">
                No, it is new
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Uploading..." : "List Item"}
        </Button> */}
        {loading ? (
          <Button size="sm" variant="outline" disabled>
            <Spinner />
            Listing Item...
          </Button>
        ) : (
          <Button type="submit" disabled={loading} className="w-full">
            List Item
          </Button>
        )}
      </form>
    </div>
  );
}
