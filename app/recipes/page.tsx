import { recipes } from "@/data/meals"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function RecipesPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breakfast":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "lunch":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "dinner":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Diabetic-Friendly Recipes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover delicious, nutritionally balanced recipes designed specifically for diabetic dietary needs. Each
            recipe includes detailed nutritional information to help you make informed choices.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(recipe.category)}>
                    {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold text-balance">{recipe.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{recipe.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Nutritional Information */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.calories}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.carbs}g</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.sugar}g</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Sugar</div>
                  </div>
                </div>

                {/* Cook Time */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Diabetic-friendly</span>
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div>
                  <h4 className="font-medium mb-2 text-sm">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{recipe.ingredients.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Plan Your Meals?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Use our intelligent meal planner to create personalized meal plans using these diabetic-friendly recipes.
          </p>
          <a
            href="/meal-planner"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Start Meal Planning
          </a>
        </div>
      </div>
    </div>
  )
}
