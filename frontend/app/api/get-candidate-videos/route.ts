// app/api/get-candidate-video/route.ts
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const candidateId = searchParams.get("candidateId")

    if (!candidateId) {
      return NextResponse.json({ error: "Candidate ID required" }, { status: 400 })
    }

    const mockVideos: { [key: string]: any[] } = {
      "1": [
        {
          filename: "introduction.mp4",
          url: "/videos/introduction.mp4",
          name: "Introduction Video",
          transcript:
            "Myself Nijan, basically born and bought up in Mundia, I'm working as a senior software testing engineer. I could have worked with Quebec's computer software private limiter from past three years. I have a three years of experience into manual testing, mobile and web application testing, and also I have performed API testing in my organization. So in these three years of span, I have worked on two projects that is both, I have worked on e-commerce domain itself. So firstly, Nandu's and B&N, Nandu's is an e-commerce application where I have used certain tools like GERA to lock the defect, and also Charles Proxy for network blocking and throttling the network, and also debuting the backend APIs. Even though I have used a postman tool to perform the API testing where I can check only the request and response. And also after that, I have got to opportunity to work on another project called as B&N. So it's an e-commerce application where I'll be in part of understanding the requirement and writing a test plan and then writing a test plan."
        },
      ],
      "2": [
        {
          filename: "introduction2.mp4",
          url: "/videos/introduction2.mp4",
          name: "Technical Overview",
          transcript:
            "Hello everyone, my name is Nehanshu Gaidhani and I am passionate software developer. I have completed my engineering with 9.6 CGPA. I have proficiency in C++ language and I do regular competitive programming in C++. I am passionate about web development in backend as well as frontend. I am proficient in JavaScript and I can build eye-catching websites with beautiful designs with backend made in Node.js and with the help of Express.js."
        },
      ],
      "3": [
        {
          filename: "introduction3.mp4",
          url: "/videos/introduction3.mp4",
          name: "Portfolio Demo",
          transcript:
            "Good afternoon, I am Ayush Dhamecacha and I am a versatile frontend developer as well as a React developer. I have completed my six-month internship in Rich Academy, which is a foundation that caters NGOs to help them access the services which are paid to them, and as well as I can communicate in English effectively."
        },
      ],
      "4": [
        {
          filename: "introduction4.mp4",
          url: "/videos/introduction4.mp4",
          name: "Coding Explanation",
          transcript:
            "Hi, my name is Rahul Aujah, a software engineer with a strong foundation in full stack development and AI powered applications. I have worked with projects ranging from web platforms to intelligent assistants using technologies like React, Node.js and Python. I am passionate about solving real world problems through scalable software and always eager to learn and grow. I am excited to be here and discuss how I can contribute to a team."
        },
      ],
      "5": [
        {
          filename: "career-goals.mp4",
          url: "/videos/candidate-5/career-goals.mp4",
          name: "Career Goals",
          transcript:
            "My career goal is to become a well-rounded software engineer who can contribute meaningfully to impactful projects. I want to work in a company that values innovation and continuous learning, where I can grow my skills in both frontend and backend development."
        },
      ],
    }

    const videos = mockVideos[candidateId] || []
    
    return NextResponse.json({ videos })
  } catch (error) {
    console.error("Error reading videos:", error)
    return NextResponse.json({ error: "Failed to read videos" }, { status: 500 })
  }
}
