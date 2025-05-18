import Link from "next/link"
import { Facebook, Linkedin, Mail, BrainCircuit } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Bruce.AI</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Exploring the frontiers of artificial intelligence, large language models, and machine learning.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/bruce.jsh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/bruce-ai-jsh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sunghunet@gmail.com"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/machine-learning"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/category/large-language-models"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Large Language Models
                </Link>
              </li>
              <li>
                <Link
                  href="/category/neural-networks"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Neural Networks
                </Link>
              </li>
              <li>
                <Link
                  href="/category/computer-vision"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Computer Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/category/reinforcement-learning"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Reinforcement Learning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/rss" className="text-foreground/70 hover:text-foreground transition-colors">
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bruce.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
