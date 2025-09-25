"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { recipes, mealPlans } from "@/data/meals"
import Image from "next/image"

interface FormData {
  age: string
  diabetesType: string
  dietaryPreferences: string
}

export default function MealPlannerPage() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    diabetesType: "",
    dietaryPreferences: "",
  })
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateMealPlan = async () => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Determine meal plan type based on form data
    let planType = "type2-balanced" // default

    if (formData.diabetesType === "type1" && formData.dietaryPreferences === "low-carb") {
      planType = "type1-low-carb"
    } else if (formData.diabetesType === "gestational") {
      planType = "gestational-moderate"
    }

    const plan = mealPlans[planType as keyof typeof mealPlans]

    // Get random recipes for each meal
    const getRandomRecipe = (recipeIds: number[]) => {
      const randomIndex = Math.floor(Math.random() * recipeIds.length)
      const recipeId = recipeIds[randomIndex]
      return recipes.find((r) => r.id === recipeId)
    }

    const generatedPlan = {
      breakfast: getRandomRecipe(plan.breakfast),
      lunch: getRandomRecipe(plan.lunch),
      dinner: getRandomRecipe(plan.dinner),
    }

    setMealPlan(generatedPlan)
    setIsLoading(false)
  }

  const isFormValid = formData.age && formData.diabetesType && formData.dietaryPreferences

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Personalized Meal Planner</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get customized meal recommendations based on your diabetes type, age, and dietary preferences. Our
            intelligent system selects the best recipes for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Yourself</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diabetes-type">Type of Diabetes</Label>
                <Select onValueChange={(value) => handleInputChange("diabetesType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diabetes type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1 Diabetes</SelectItem>
                    <SelectItem value="type2">Type 2 Diabetes</SelectItem>
                    <SelectItem value="gestational">Gestational Diabetes</SelectItem>
                    <SelectItem value="prediabetes">Prediabetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary-preferences">Dietary Preferences</Label>
                <Select onValueChange={(value) => handleInputChange("dietaryPreferences", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced Diet</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="low-sodium">Low Sodium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateMealPlan} disabled={!isFormValid || isLoading} className="w-full" size="lg">
                {isLoading ? "Generating Your Plan..." : "Generate Meal Plan"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {!mealPlan && !isLoading && (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your Meal Plan Will Appear Here</h3>
                  <p className="text-muted-foreground">Fill out the form to get personalized meal recommendations</p>
                </CardContent>
              </Card>
            )}

            {isLoading && (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Creating your personalized meal plan...</p>
                </CardContent>
              </Card>
            )}

            {mealPlan && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Personalized Meal Plan</h2>

                {["breakfast", "lunch", "dinner"].map((mealType) => {
                  const meal = mealPlan[mealType]
                  if (!meal) return null

                  return (
                    <Card key={mealType}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={meal.image || "/placeholder.svg"}
                              alt={meal.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="capitalize">
                                {mealType}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{meal.cookTime}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>

                            <div className="flex gap-4 text-sm">
                              <span className="font-medium">{meal.calories} cal</span>
                              <span className="text-muted-foreground">{meal.carbs}g carbs</span>
                              <span className="text-muted-foreground">{meal.sugar}g sugar</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Daily Totals</h3>
                    <div className="flex justify-center gap-6 text-sm">
                      <div>
                        <div className="font-bold text-lg text-primary">
                          {Object.values(mealPlan).reduce((sum: number, meal: any) => sum + meal.calories, 0)}
                        </div>
                        <div className="text-muted-foreground">Calories</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-primary">
                          {Object.values(mealPlan).reduce((sum: number, meal: any) => sum + meal.carbs, 0)}g
                        </div>
                        <div className="text-muted-foreground">Carbs</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-primary">
                          {Object.values(mealPlan).reduce((sum: number, meal: any) => sum + meal.sugar, 0)}g
                        </div>
                        <div className="text-muted-foreground">Sugar</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Educational Note */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  This meal planner provides general suggestions based on common dietary guidelines for diabetes
                  management. Always consult with your healthcare provider or registered dietitian before making
                  significant changes to your diet. Individual nutritional needs may vary based on medications, activity
                  level, and other health conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
