"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: number
  author: string
  content: string
  timestamp: string
  category: string
  likes: number
}

const initialMessages: Message[] = [
  {
    id: 1,
    author: "Sarah M.",
    content:
      "Just wanted to share that I've been using the meal planner for 2 weeks now and my blood sugar levels have been much more stable! The recipes are actually delicious too. Thank you for this amazing resource!",
    timestamp: "2 hours ago",
    category: "Success Story",
    likes: 12,
  },
  {
    id: 2,
    author: "Mike R.",
    content:
      "Does anyone have tips for managing blood sugar during travel? I have a business trip coming up and I'm worried about maintaining my routine.",
    timestamp: "5 hours ago",
    category: "Question",
    likes: 3,
  },
  {
    id: 3,
    author: "Jennifer L.",
    content:
      "The Greek Yogurt Berry Bowl has become my go-to breakfast! I add some chopped walnuts for extra protein. My morning readings have improved significantly.",
    timestamp: "1 day ago",
    category: "Recipe Share",
    likes: 8,
  },
  {
    id: 4,
    author: "David K.",
    content:
      "Remember everyone - small changes make a big difference. I started with just swapping white rice for quinoa and it's helped so much. Don't try to change everything at once!",
    timestamp: "2 days ago",
    category: "Motivation",
    likes: 15,
  },
]

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("General")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !authorName.trim()) return

    const message: Message = {
      id: messages.length + 1,
      author: authorName,
      content: newMessage,
      timestamp: "Just now",
      category: selectedCategory,
      likes: 0,
    }

    setMessages([message, ...messages])
    setNewMessage("")
    setAuthorName("")
  }

  const handleLike = (messageId: number) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Success Story":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Question":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Recipe Share":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "Motivation":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Community Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with others on similar journeys. Share experiences, ask questions, and find motivation in our
            supportive community.
          </p>
        </div>

        {/* Post New Message */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share with the Community</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name (first name + initial)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Success Story">Success Story</option>
                  <option value="Question">Question</option>
                  <option value="Recipe Share">Recipe Share</option>
                  <option value="Motivation">Motivation</option>
                </select>
              </div>
              <Textarea
                placeholder="Share your thoughts, experiences, or questions..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
                required
              />
              <Button type="submit" disabled={!newMessage.trim() || !authorName.trim()}>
                Post Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Community Guidelines</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Be respectful and supportive of all community members</li>
              <li>• Share experiences, not medical advice</li>
              <li>• Protect privacy - use first name and initial only</li>
              <li>• Keep discussions focused on diabetes management and healthy living</li>
            </ul>
          </CardContent>
        </Card>

        {/* Messages Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Community Messages</h2>

          {messages.map((message) => (
            <Card key={message.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">{message.author.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{message.author}</h4>
                      <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(message.category)}>{message.category}</Badge>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">{message.content}</p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(message.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>
                      {message.likes} {message.likes === 1 ? "like" : "likes"}
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Resources */}
        <Card className="mt-12 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Additional Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <div>
                <h4 className="font-semibold mb-2">Professional Support</h4>
                <ul className="text-sm space-y-1">
                  <li>• American Diabetes Association: diabetes.org</li>
                  <li>• Diabetes Support Groups (local)</li>
                  <li>• Certified Diabetes Educators</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Contacts</h4>
                <ul className="text-sm space-y-1">
                  <li>• Your healthcare provider</li>
                  <li>• Emergency services: 911</li>
                  <li>• Diabetes emergency hotline</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
