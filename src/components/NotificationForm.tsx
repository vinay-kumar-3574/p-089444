import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";

interface NotificationFormProps {
  onComplete: (data: any) => void;
  events: any[];
  onCancel?: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onComplete, events, onCancel }) => {
  const [formData, setFormData] = useState({
    eventId: '',
    audience: 'all',
    type: 'instant',
    subject: '',
    message: '',
    useGPT: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="event">Select Event</Label>
          <Select value={formData.eventId} onValueChange={(value) => setFormData({ ...formData, eventId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="audience">Target Audience</Label>
          <Select value={formData.audience} onValueChange={(value) => setFormData({ ...formData, audience: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="students">Students Only</SelectItem>
              <SelectItem value="alumni">Alumni Only</SelectItem>
              <SelectItem value="specific">Specific Batches</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="type">Notification Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instant">Instant</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useGPT"
            checked={formData.useGPT}
            onCheckedChange={(checked) => setFormData({ ...formData, useGPT: checked })}
          />
          <Label htmlFor="useGPT">Use GPT for content</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Notification subject"
          required
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Enter your message..."
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex items-center gap-2">
          <Send className="w-4 h-4" />
          Send Notification
        </Button>
      </div>
    </form>
  );
};

export default NotificationForm; 