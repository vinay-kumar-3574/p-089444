import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EventFormProps {
  onComplete: (data: any) => void;
  onCancel?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    date: '',
    time: '',
    location: '',
    maxSeats: '',
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the event data for API submission
      const eventData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: formData.date,
        time: formData.time,
        location: formData.location,
        maxSeats: parseInt(formData.maxSeats),
        image: formData.image ? URL.createObjectURL(formData.image) : "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop", // fallback image
        status: "upcoming",
        registeredSeats: 0
      };

      // POST to backend
      await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      // POST to n8n webhook (optional, for Google Sheets)
      await fetch("https://n8n-ssznitez.us-east-1.clawcloudrun.com/webhook/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      toast({
        title: "Event created successfully!",
        description: "The event has been saved and notifications will be sent.",
      });
      onComplete(eventData);
    } catch (error) {
      console.error("Event creation error:", error);
      toast({
        title: "Event creation error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event title"
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your event..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Tech, Career, Networking"
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Event location"
            required
          />
        </div>
        <div>
          <Label htmlFor="maxSeats">Max Seats</Label>
          <Input
            id="maxSeats"
            type="number"
            value={formData.maxSeats}
            onChange={(e) => setFormData({ ...formData, maxSeats: e.target.value })}
            placeholder="100"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Event Banner</Label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-2 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500">
                <span>Upload a file</span>
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex items-center gap-2" disabled={loading}>
          {loading ? "Creating event..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm; 