import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    id: 1,
    title: "Understanding the Glycemic Index",
    category: "Nutrition Basics",
    readTime: "5 min read",
    excerpt:
      "Learn how different foods affect your blood sugar levels and make informed choices for better glucose control.",
    content: `The glycemic index (GI) is a valuable tool for managing diabetes. It ranks foods from 0-100 based on how quickly they raise blood glucose levels. Foods with a low GI (55 or less) are digested slowly, causing a gradual rise in blood sugar. These include most vegetables, legumes, and whole grains.

    Medium GI foods (56-69) include sweet potatoes, brown rice, and whole wheat bread. High GI foods (70+) like white bread, potatoes, and sugary snacks cause rapid spikes in blood glucose.

    Focus on incorporating more low-GI foods into your meals to maintain stable blood sugar levels throughout the day.`,
  },
  {
    id: 2,
    title: "Smart Food Swaps for Diabetics",
    category: "Meal Planning",
    readTime: "4 min read",
    excerpt:
      "Simple ingredient substitutions that can significantly improve the nutritional profile of your favorite dishes.",
    content: `Making small changes to your favorite recipes can have a big impact on blood sugar management:

    • Replace white rice with cauliflower rice or quinoa
    • Use Greek yogurt instead of sour cream
    • Swap regular pasta for zucchini noodles or shirataki noodles
    • Choose almond flour over white flour for baking
    • Use avocado or nut butters instead of butter
    • Replace sugary drinks with infused water or unsweetened tea

    These swaps reduce carbohydrates and add beneficial nutrients like fiber, protein, and healthy fats.`,
  },
  {
    id: 3,
    title: "Emergency Low Blood Sugar Foods",
    category: "Emergency Care",
    readTime: "3 min read",
    excerpt: "Essential knowledge about treating hypoglycemia quickly and effectively with the right foods.",
    content: `Hypoglycemia (blood sugar below 70 mg/dL) requires immediate treatment. The "15-15 rule" is your guide:

    Quick-acting carbohydrates (15g):
    • 3-4 glucose tablets
    • 1/2 cup fruit juice
    • 1 tablespoon honey
    • 5-6 hard candies
    • 1/2 cup regular soda

    After treatment, wait 15 minutes and recheck blood sugar. If still low, repeat treatment. Once levels normalize, eat a small snack with protein and complex carbs to prevent another drop.

    Always carry emergency supplies and inform others about your condition.`,
  },
  {
    id: 4,
    title: "Meal Timing and Blood Sugar Control",
    category: "Lifestyle",
    readTime: "6 min read",
    excerpt: "How when you eat can be just as important as what you eat for optimal diabetes management.",
    content: `Consistent meal timing helps regulate blood sugar levels and improves medication effectiveness:

    • Eat at regular intervals (every 3-4 hours)
    • Don't skip meals, especially if taking diabetes medication
    • Consider smaller, more frequent meals to avoid large glucose spikes
    • Time meals with medication schedules as directed by your healthcare provider
    • Monitor how different meal timings affect your blood sugar patterns

    Keep a food and glucose log to identify your optimal eating schedule and share findings with your healthcare team.`,
  },
]

export default function EducationPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Diabetes Education Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Evidence-based information to help you make informed decisions about your diabetes management and nutrition.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <CardTitle className="text-2xl">{article.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {article.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips Section */}
        <Card className="mt-12 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Quick Daily Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Check blood glucose levels as recommended by your healthcare provider</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Stay hydrated with water throughout the day</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Include physical activity in your daily routine</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Keep emergency glucose supplies readily available</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Medical Disclaimer</h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  The information provided here is for educational purposes only and should not replace professional
                  medical advice. Always consult with your healthcare provider before making changes to your diabetes
                  management plan, medication, or diet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
