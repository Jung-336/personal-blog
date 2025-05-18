import type { Metadata } from "next"
import Image from "next/image"
import { BrainCircuit, Award, BookOpen, Briefcase, GraduationCap, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | Bruce.AI",
  description: "Learn more about Bruce.AI and the person behind it",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <div className="md:sticky md:top-24 w-full md:w-1/3 shrink-0">
            <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
              <Image src="/placeholder.svg?height=400&width=400" alt="Profile" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Bruce.AI</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">#LLM전문가</Badge>
                <Badge variant="outline">#Agent개발</Badge>
                <Badge variant="outline">#장영실상수상</Badge>
                <Badge variant="outline">#AI솔루션</Badge>
                <Badge variant="outline">#데이터사이언스</Badge>
              </div>
              <Button asChild className="mt-2">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-6">About Me</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p>
                저는 <strong>데이터와 분석이라는 일관된 길</strong>을 걸으며 AI와 데이터 사이언스 분야의 전문성을
                쌓아왔습니다. 직접 개발한 AI 솔루션으로 <strong>IR52 장영실상</strong> 빅데이터 부문을 수상하여 기술적
                전문성과 혁신성을 인정받았습니다.
              </p>
              <p>
                노력 및 경험으로 축적된 문제 해결 능력과 열정을 바탕으로, AI 기술 경쟁력 강화를 위해 노력하고 있습니다.
                향후 <strong>Advanced LLM/멀티모달</strong>, <strong>자율 AI 에이전트</strong>의 연구/활용을 통해 데이터
                기반의 기술 혁신을 주도하며 비즈니스 성과 향상 및 기술 도약을 이끌어내고자 합니다.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">전문 분야</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">LLM(Large Language Model)</h3>
                    <p className="text-muted-foreground text-sm">최신 LLM 기술 기반 솔루션 기획/설계/개발</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Multi-agent 시스템 개발</h3>
                    <p className="text-muted-foreground text-sm">
                      복잡한 문제 해결을 위한 다중 에이전트 시스템 설계 및 구현
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Machine Learning</h3>
                    <p className="text-muted-foreground text-sm">데이터 기반 예측 모델링 및 분석</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Data Architecture / Engineering</h3>
                    <p className="text-muted-foreground text-sm">전사 데이터 아키텍처 설계 및 데이터 파이프라인 구축</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Medal className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">자격 및 수상</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="text-sm text-muted-foreground w-24 shrink-0">2018.08</div>
                  <div>
                    <h3 className="font-medium">IR52 장영실상 수상 [빅데이터 부문]</h3>
                    <p className="text-sm text-muted-foreground">과학기술정보통신부</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-sm text-muted-foreground w-24 shrink-0">2012.07</div>
                  <div>
                    <h3 className="font-medium">데이터아키텍처전문가(DAP)</h3>
                    <p className="text-sm text-muted-foreground">한국데이터산업진흥원</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">교육</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="text-sm text-muted-foreground w-24 shrink-0">2003-2005</div>
                  <div>
                    <h3 className="font-medium">서울시립대학교 대학원</h3>
                    <p className="text-sm">마케팅공학 석사 졸업</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-sm text-muted-foreground w-24 shrink-0">1996-2003</div>
                  <div>
                    <h3 className="font-medium">서울시립대학교</h3>
                    <p className="text-sm">경영학 학사 졸업</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">주요 경력</h2>
              </div>
              <ul className="space-y-6">
                <li className="border-l-2 border-border pl-4 pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <h3 className="font-medium">지엔아이티(ZNIT)</h3>
                    <span className="text-sm text-muted-foreground">2022.08 - 2025.03</span>
                  </div>
                  <p className="text-sm mb-2">기술연구소 / 연구소장</p>
                  <p className="text-sm text-muted-foreground">
                    LLM 기술 연구 및 개발 총괄, Multi-Agent 시스템 설계, 데이터 기반 분석 프로젝트 주도
                  </p>
                </li>
                <li className="border-l-2 border-border pl-4 pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <h3 className="font-medium">비아이매트릭스</h3>
                    <span className="text-sm text-muted-foreground">2013.06 - 2020.09</span>
                  </div>
                  <p className="text-sm mb-2">기술연구소 / 수석연구원</p>
                  <p className="text-sm text-muted-foreground">
                    AI 빅데이터 분석 솔루션 'i-STREAM' 기획 및 핵심 기능 개발 주도, IR52 장영실상 수상
                  </p>
                </li>
                <li className="border-l-2 border-border pl-4 pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                    <h3 className="font-medium">이씨마이너</h3>
                    <span className="text-sm text-muted-foreground">2008.07 - 2013.04</span>
                  </div>
                  <p className="text-sm mb-2">솔루션 개발팀, 컨설팅팀 / 과장</p>
                  <p className="text-sm text-muted-foreground">
                    Hadoop 기반 빅데이터 분석 기술 R&D, 금융권 AML 프로젝트 참여, 데이터 마이닝 기반 이상거래 탐지 모델
                    개발
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">주요 프로젝트</h2>
              </div>
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <h3 className="text-xl font-medium">면접 대행 AI Agent 개발</h3>
                    <span className="text-sm text-muted-foreground">2025.04</span>
                  </div>
                  <p className="mb-4">
                    AI Agent가 면접대상자를 대신해서 면접을 보는 기능을 구현한 프로젝트입니다. RAG 기술을 활용하여 면접
                    대상자의 정보(이력서, 자소서 등)를 기반으로 자연스러운 대화를 구현했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>RAG</Badge>
                    <Badge>Claude 3.7</Badge>
                    <Badge>n8n</Badge>
                    <Badge>Pinecone</Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <h3 className="text-xl font-medium">AI 빅데이터 분석 솔루션 i-STREAM 개발</h3>
                    <span className="text-sm text-muted-foreground">2013.01 - 2020.08</span>
                  </div>
                  <p className="mb-4">
                    기업 사용자의 코딩 없는 데이터 분석, 머신러닝 모델링, 시각화를 지원하는 엔터프라이즈급 AI 협업
                    솔루션을 개발했습니다. 이 솔루션으로 IR52 장영실상 빅데이터 부문을 수상했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Machine Learning</Badge>
                    <Badge>Data Mining</Badge>
                    <Badge>R</Badge>
                    <Badge>Python</Badge>
                    <Badge>Java</Badge>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
