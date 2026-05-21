// Edit the records in COURSE_DATA to update the site during the term.
(function () {
  "use strict";

  var COURSE_DATA = {
    announcements: [
      {
        title: "Lec4",
        html: `Lecture 4's slides are uploaded.`,
        updated: "May 20, 2026"
      },
      {
        title: "Lec3",
        html: `Lecture 3's slides are uploaded.<br> Fill out <a href="https://forms.gle/1VvzPu4DjyWy5B2c7" target="_blank">team info form</a>.`,
        updated: "May 19, 2026"
      },
      {
        title: "Lec2",
        html: `Lecture 2's slides are uploaded.<br> Fill out <a href="https://forms.gle/1VvzPu4DjyWy5B2c7" target="_blank">team info form</a>.`,
        updated: "May 18, 2026"
      },
      {
        title: "Welcome",
        html: `Welcome to DS 5110!<br> Fill out the <a href="https://forms.gle/WPeAd8CFqTkt6TZr6" target="_blank" rel="noreferrer">background survey</a> by 05/16.<br> Lecture 1's slides are uploaded.`,
        updated: "May 13, 2026"
      },
    ],
    meta: [
      { label: "Meeting Time", value: "Mon-Fri, 9AM to 11:15AM" },
      { label: "Instructor", value: "Yue Cheng" },
      { label: "Location", value: "Clark Hall 107" },
    ],
    topics: [
      "Computer systems foundations and distributed computing",
	  "AI coding tools, agentic frameworks",
      "Fundational big data infra: Google File System and MapReduce",
      "Apache Spark and parallel dataflow systems",
      "Distributed AI programming frameworks: Ray",
      "Cloud computing, storage, and serverless systems",
      "AI infrastructure"
    ],
    syllabusHtml: `

      <nav class="syllabus-toc" aria-label="Syllabus table of contents">
        <a href="#syllabus-resources">Resources</a>
        <a href="#syllabus-reading">Reading</a>
        <a href="#syllabus-participation">Participation and readings</a>
        <a href="#syllabus-programming">Programming assignments</a>
        <a href="#syllabus-projects">Course projects</a>
        <a href="#syllabus-grading">Grading</a>
        <a href="#syllabus-late">Late policy</a>
        <a href="#syllabus-integrity">Academic Integrity</a>
        <a href="#syllabus-accessibility">Accessibility</a>
      </nav>

      <section id="syllabus-resources">
        <h3>Resources</h3>
        <p>Go to the <a href="#materials">Materials tab</a>.</p>
      </section>

      <section id="syllabus-reading">
        <h3>Reading</h3>
        <p>There are no official textbooks. Required readings are most frequently in the form of seminal research papers, online documentations, and/or selected textbook chapters. There are several books that might be useful:</p>
        <ul>
          <li><a target="_blank" href="http://pages.cs.wisc.edu/~remzi/OSTEP/">Operating Systems: Three Easy Pieces (OSTEP)</a>, by Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau, Aug, 2018 v 1.00 (free book).</li>
          <li><a target="_blank" href="https://dataintensive.net/">Designing Data-Intensive Applications (1st Edition)</a>, by Martin Kleppmann. See the instructions below for accessing the free version via UVA Library.</li>
          <li><a target="_blank" href="https://www.distributed-systems.net/index.php/books/ds3/">Distributed Systems 3rd edition (2017)</a>, by Maarten van Steen and Andrew S. Tenenbaum (free book).</li>
        </ul>
        <p>To access the O'Reilly textbook, <em>Designing Data-Intensive Applications</em>, do the following:</p>
        <ol>
          <li>Access the <a target="_blank" href="https://www.library.virginia.edu/">UVA Library website</a>.</li>
          <li>Search for the title: Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems.</li>
          <li>Click <em>Library Catalog (Access Online)</em>, and sign into the O'Reilly website with your UVA email address. If the O'Reilly link brings you to an audiobook, search for the textbook in O'Reilly and find the ebook.</li>
        </ol>
      </section>

      <section id="syllabus-participation">
        <h3>Class participation and required readings</h3>
		<p>Class participation is required. We will discuss the
design and use of a variety of modern big data systems covered during
the course. Most of these systems have research papers, if not online
docs, which present their original or evolved designs. One example is
Google's MapReduce, and later the open-source implementation Apache
Hadoop, which opened a new era of what we call <strong>Big Data
Systems</strong> today.</p>
		<p>The instructor or invited guest speaker will lead lecture.
In some lectures we will have moderated discussions about readings
assigned before class. You are encouraged to participate in
discussions. To stimulate better discussion, you need to complete the
assigned readings, such as a research paper about a topic. One way to
test your understanding is to read assigned material with questions
in mind. The instructor will provide reading questions a few days
before lecture.</p>
		<p>You are also encouraged to discuss assigned and optional
readings with other students in the class. Students often form
reading groups, which is encouraged; however, group discussion is
<strong>not an effective substitute for actually reading the
paper</strong>.</p>
	    <p>
		There will be hands-on lab sessions once or twice each week. 
Be prepared to bring your own laptop computer to the class. 
		</p>
      </section>

      <section id="syllabus-programming">
        <h3>Programming assignments</h3>
        <p>We will have assignments during the course:</p>
        <ul>
          <li>Assignment 0: AWS Academy, EC2, Linux shell, and AI coding CLI.</li>
          <li>Assignment 1: Analytics with Spark and DuckDB.</li>
          <li>Assignment 2: Burst-parallel ML with AWS Lambda.</li>
        </ul>
      </section>

      <section id="syllabus-projects">
        <h3>Course projects</h3>
        <p>Probably the most exciting part of this course is to complete an interesting project related to big data systems. I will provide a list of ideas around Week 4.</p>
      </section>

      <section id="syllabus-grading">
        <h3>Grading</h3>
        <p>Your grade will be calculated as follows:</p>
        <ul>
          <li>10% assignment 0</li>
          <li>20% assignment 1</li>
          <li>20% assignment 2</li>
          <li>30% project</li>
          <li>20% final presentation</li>
        </ul>

        <h4>Midterm and final exams</h4>
		<p>Due to the tight schedule, there will be no midterm or
final exams. There will be a midterm presentation and final
presentation.</p>

        <h4>Quizzes</h4>
        <p>There will be a short quiz due at the end of some lectures. Make sure you know the rules regarding what is allowed and what is not.</p>

        <h5>Allowed</h5>
        <ul>
          <li>However much time you need.</li>
          <li>Discussing answers with classmates who are taking the quiz <strong>at the same time</strong>.</li>
          <li>Referencing texts, notes, or provided course materials.</li>
          <li>Searching online for general information.</li>
          <li>Running code.</li>
        </ul>

        <h5>NOT allowed</h5>
        <ul>
          <li>Taking it more than once.</li>
          <li>Discussing answers with anybody outside of the course.</li>
          <li>Discussing with classmates who have already completed the quiz when you have not completed it yourself yet.</li>
          <li>Posting anything online about the quizzes.</li>
          <li>Using such material potentially posted by other students who broke the preceding rule.</li>
          <li>Getting TA or instructor help on quiz questions prior to the quiz deadline.</li>
        </ul>

        <h4>Grading rules</h4>
        <p>The final grade is computed according to the following rules:</p>
        <ul>
          <li>A+: &gt;= 98%; A: [93%, 98%); A-: [90%, 93%)</li>
          <li>B+: [87%, 90%); B: [83%, 87%); B-: [80%, 83%)</li>
          <li>C+: [77%, 80%); C: [73%, 77%); C-: [70%, 73%)</li>
          <li>D+: [67%, 70%); D: [63%, 67%); D-: [60%, 63%)</li>
          <li>F: &lt; 60%</li>
        </ul>
      </section>

      <section id="syllabus-late">
        <h3>Late policy</h3>
        <p>Students must work individually on all programming assignments. We encourage high-level discussions with other students about the assignments; however, when you turn in an assignment, it must be only your work. Copying any part of another student's assignment is strictly prohibited, and repercussions may be severe, up to and including failing the class outright. You are free to reuse small snippets of example code found on the Internet, such as via StackOverflow, provided that it is attributed. If you are concerned that reusing and attributing copied code may make it appear that you did not complete the assignment yourself, raise the issue with the instructor.</p>
        <p>Your work is late if it is not turned in by the deadline.</p>
        <ul>
          <li><strong>10% will be deducted for late assignments each day after the due date.</strong> If an assignment is late, we will grade it and scale the score by 0.9 if it is up to one day late, by 0.8 if it is up to two days late, and by 0.7 if it is up to three days late.</li>
          <li><strong>Late assignments will only be accepted for 3 days after the due date.</strong> Assignments submitted more than 3 days late will receive a zero. If you are worried about being busy around a homework submission, plan ahead and get started early.</li>
          <li><strong>An assignment that does not compile or run will receive at most 50% credit.</strong></li>
        </ul>
        <blockquote>Important: please plan ahead and get started early. Debugging distributed systems can be time-consuming.</blockquote>
        <p><strong>For fairness to all, there are no exceptions to the above rules.</strong></p>
      </section>

      <section id="syllabus-integrity">
        <h3>Academic Integrity</h3>
        <p>The School relies upon and cherishes its community of trust. We firmly endorse, uphold, and embrace the University's Honor principle that students will not lie, cheat, or steal, nor shall they tolerate those who do. We recognize that even one honor infraction can destroy an exemplary reputation that has taken years to build. Acting in a manner consistent with the principles of honor will benefit every member of the community both while enrolled in the School of Data Science and in the future. Students are expected to be familiar with the <a href="https://honor.virginia.edu/">university honor code</a>, including the section on <a href="https://honor.virginia.edu/academic-fraud">academic fraud</a>.</p>
        <p><strong>Citing ChatGPT or other LLMs:</strong> use of these tools is allowed with proper citation.</p>
        <ul>
          <li>Use of the tools is permitted, with proper citation.</li>
          <li>A "chats" directory should contain screenshots or PDFs of any chats, in their entirety. Name them as chat1.png, chat2.png, etc. PDF and JPG formats are also permitted.</li>
        </ul>
      </section>

      <section id="syllabus-accessibility">
        <h3>Students with disabilities or learning needs</h3>
        <p>It is my goal to create a learning experience that is as accessible as possible. If you anticipate any issues related to the format, materials, or requirements of this course, please meet with me outside of class so we can explore potential options. Students with disabilities may also wish to work with the Student Disability Access Center to discuss options for removing barriers in this course, including official accommodations. Please visit <a href="https://sdac.studenthealth.virginia.edu">their website</a> for information on this process and to apply for services online. If you have already been approved for accommodations through SDAC, please send me your accommodation letter and meet with me so we can develop an implementation plan together.</p>
      </section>
    `,
    schedule: [
      { week: 1, date: "Mon May 18", topic: "Introduction", 
		materials: [
			{ text: "Lec1a: Introduction", href: "assets/docs/lec1a-intro.pdf" },
			{ text: "Lec1b: Shell, TUI, AI coding CLI", href: "assets/docs/lec1b-shell.pdf" },
			{ text: "Video", href: "https://edstem.org/us/courses/98636/discussion/8085142" },
			{ text: "Background survey", href: "https://forms.gle/WPeAd8CFqTkt6TZr6" },
			{ text: "Team information form", href: "https://forms.gle/1VvzPu4DjyWy5B2c7" }
		], notes: "Assignment 0 out" },
      { week: 1, date: "Tue May 19", topic: "Agent context engineering", materials: [
			{ text: "Lec2: Prompt engineering to context engineering", href: "assets/docs/lec2-ctx-engineering.pdf" },
			{ text: "Video", href: "https://edstem.org/us/courses/98636/discussion/8085144" },
		], notes: "" },
      { week: 1, date: "Wed May 20", topic: "Python numeric types, parallel processing", 
		materials: [
			{ text: "Lec3: Python numeric types, parallel processing", href: "assets/docs/lec3-python-dtypes-parallel.pdf" },
			{ text: "Video", href: "https://edstem.org/us/courses/98636/discussion/8085145" },
			{ text: "Notebook demo", href: "https://github.com/tddg/ds5110-summer26/blob/main/assets/datasets/lec3_python_dtypes_demo.ipynb" },
			{ text: "Thinking Machines: Defeating Nondeterminism in LLM Inference", href: "https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/" },
		], notes: "" },
      { week: 1, date: "Thu May 21", topic: "GFS, MapReduce, Spark", 
		materials: [
			{ text: "Lec4: GFS, MapReduce, and Spark", href: "assets/docs/lec4-mapreduce-spark.pdf" },
			{ text: "GFS paper", href: "https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf" },
			{ text: "MapReduce paper", href: "https://www.usenix.org/conference/osdi-04/mapreduce-simplified-data-processing-large-clusters" },
			{ text: "Spark RDD paper", href: "https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia" },
		], notes: "" },
      { week: 1, date: "Fri May 22", topic: "Lab 1", materials: [], notes: "Assignment 0 due<br>Assignment 1 out" },
      { week: 2, date: "Mon May 25", topic: "Memorial Day", materials: [], notes: "No class" },
      { week: 2, date: "Tue May 26", topic: "Cloud and serverless computing", materials: [], notes: "" },
      { week: 2, date: "Wed May 27", topic: "Cloud storage (AWS S3)", materials: [], notes: "" },
      { week: 2, date: "Thu May 28", topic: "Project discussion", materials: [], notes: "" },
      { week: 2, date: "Fri May 29", topic: "Lab 2", materials: [], notes: "Assignment 1 due<br>Assignment 2 out" },
      { week: 3, date: "Mon Jun 1", topic: "AI systems foundation", materials: [], notes: "" },
      { week: 3, date: "Tue Jun 2", topic: "Model optimization", materials: [], notes: "" },
      { week: 3, date: "Wed Jun 3", topic: "AI programming frameworks (Ray)", materials: [], notes: "" },
      { week: 3, date: "Thu Jun 4", topic: "AI infastructure", materials: [], notes: "" },
      { week: 3, date: "Fri Jun 5", topic: "Lab 3", materials: [], notes: "Assignment 2 due" },
      { week: 4, date: "Mon Jun 8", topic: "LLM model storage and compression", materials: [], notes: "" },
      { week: 4, date: "Tue Jun 9", topic: "Multimodal generation", materials: [], notes: "" },
      { week: 4, date: "Wed Jun 10", topic: "Computational notebooks", materials: [], notes: "" },
      { week: 4, date: "Thu Jun 11", topic: "Final presentation 1", materials: [], notes: "" },
      { week: 4, date: "Fri Jun 12", topic: "Final presentation 2", materials: [], notes: "Course wrap-up" }
    ],
    assignments: [
      { title: "Assignment 0", subtitle: "AWS Academy, EC2, Linux shell, and AI coding CLI", due: "Fri May 22, 11:59 PM ET", dueDate: "2026-05-22T23:59:00-04:00", href: "assignments/a0.html" },
      { title: "Assignment 1", subtitle: "Analytics with Spark and DuckDB", due: "Fri May 29, 11:59 PM ET", dueDate: "2026-05-29T23:59:00-04:00", href: "assignments/a1.html" },
      { title: "Assignment 2", subtitle: "Burst-parallel ML with AWS Lambda", due: "Fri Jun 5, 11:59 PM ET", dueDate: "2026-06-05T23:59:00-04:00", href: "#" }
    ],
    staff: [
      { name: "Yue Cheng", role: "Instructor", email: "mrz7dp@virginia.edu", officeHours: "Thursday 3pm to 4pm (Zoom)", website: "https://tddg.github.io" },
      { name: "Yuyang Cheng", role: "GTA", email: "jrm9ga@virginia.edu", officeHours: "TBD" },
      { name: "Parvati Viswanathan", role: "GTA", email: "bsg5ec@virginia.edu", officeHours: "TBD" }
    ]
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function $$(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(text, href) {
    var a = document.createElement("a");
    a.textContent = text;
    a.href = href || "#";
    if (href && href.indexOf("http") === 0) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
    return a;
  }

  function renderAnnouncement() {
    var target = $("#announcement-list");
    var toggle = $("#announcement-toggle");
    if (!target) {
      var title = $("#announcement-title");
      var body = $("#announcement-body");
      if (title && body && COURSE_DATA.announcements.length > 0) {
        title.textContent = COURSE_DATA.announcements[0].title;
        body.textContent = COURSE_DATA.announcements[0].body + " Updated: " + COURSE_DATA.announcements[0].updated + ".";
      }
      return;
    }

    var showAll = target.getAttribute("data-show-all") === "true";
    target.innerHTML = "";
    COURSE_DATA.announcements
      .filter(function (_item, index) { return showAll || index === 0; })
      .forEach(function (item, index) {
      var article = el("article", index === 0 ? "announcement-item latest" : "announcement-item");
      article.appendChild(el("span", "announcement-date", item.updated));
      article.appendChild(el("h3", "", item.title));
      if (item.html) {
        var body = el("div", "announcement-body");
        body.innerHTML = item.html;
        article.appendChild(body);
      } else {
        article.appendChild(el("p", "", item.body));
      }
      target.appendChild(article);
    });

    if (toggle) {
      toggle.hidden = COURSE_DATA.announcements.length <= 1;
      toggle.textContent = showAll ? "Show latest announcement only" : "Show all announcements";
      toggle.setAttribute("aria-expanded", showAll ? "true" : "false");
    }
  }

  function renderMeta() {
    var target = $("#course-meta");
    target.innerHTML = "";
    COURSE_DATA.meta.forEach(function (item) {
      var card = el("div", "meta-card");
      card.appendChild(el("span", "meta-label", item.label));
      card.appendChild(el("strong", "", item.value));
      target.appendChild(card);
    });
  }

  function renderTopics() {
    var target = $("#topic-list");
    target.innerHTML = "";
    COURSE_DATA.topics.forEach(function (topic) {
      target.appendChild(el("li", "", topic));
    });
  }

  function renderSyllabus() {
    var target = $("#syllabus-content");
    target.className = "syllabus-doc";
    target.innerHTML = COURSE_DATA.syllabusHtml;
  }

  function renderSchedule(filter) {
    var target = $("#schedule-body");
    target.innerHTML = "";
    COURSE_DATA.schedule
      .filter(function (item) { return filter === "all" || String(item.week) === filter; })
      .forEach(function (item) {
        var tr = document.createElement("tr");
        var date = el("td", "date-cell");
        date.appendChild(el("span", "week-label", "Week " + item.week));
        date.appendChild(el("strong", "", item.date));

        var topic = el("td", "", item.topic);
        var materials = el("td", "materials-cell");
        if (item.materials.length === 0) {
          materials.textContent = "TBD";
        } else {
          item.materials.forEach(function (material) {
            var materialLine = el("div", "material-line");
            materialLine.appendChild(link(material.text, material.href));
            materials.appendChild(materialLine);
          });
        }

        tr.appendChild(date);
        tr.appendChild(topic);
        tr.appendChild(materials);
        var note = el("td", "note-cell");
        note.innerHTML = item.notes || "";
        tr.appendChild(note);
        target.appendChild(tr);
      });
  }

  function renderMaterials() {
    var target = $("#materials-grid");
    target.innerHTML = "";
    COURSE_DATA.schedule.forEach(function (item) {
      var card = el("article", "material-card");
      card.appendChild(el("span", "week-label", "Week " + item.week + " / " + item.date));
      card.appendChild(el("h3", "", item.topic));
      var links = el("div", "material-links");
      if (item.materials.length === 0) {
        links.appendChild(el("span", "muted", "Materials pending"));
      } else {
        item.materials.forEach(function (material) {
          links.appendChild(link(material.text, material.href));
        });
      }
      card.appendChild(links);
      target.appendChild(card);
    });
  }

  function renderAssignments() {
    var target = $("#assignment-list");
    target.innerHTML = "";
    var now = new Date();
    COURSE_DATA.assignments.forEach(function (item) {
      var deadline = item.dueDate ? new Date(item.dueDate) : null;
      var isClosed = deadline && now > deadline;
      var availability = isClosed ? "Closed" : "Open";
      var row = el("article", "assignment-row");
      var main = el("div", "");
      var heading = el("h3", "");
      heading.appendChild(link(item.title, item.href));
      main.appendChild(heading);
      main.appendChild(el("p", "", item.subtitle));
      var meta = el("div", "assignment-meta");
      meta.appendChild(el("span", "", "Due: " + item.due));
      meta.appendChild(el("span", isClosed ? "status-closed" : "status-open", availability));
      row.appendChild(main);
      row.appendChild(meta);
      target.appendChild(row);
    });
  }

  function renderStaff() {
    var target = $("#staff-grid");
    target.innerHTML = "";
    COURSE_DATA.staff.forEach(function (person) {
      var card = el("article", "staff-card");
      card.appendChild(el("span", "staff-role", person.role));
      if (person.website) {
        var h3 = el("h3", "");
        h3.appendChild(link(person.name, person.website));
        card.appendChild(h3);
      } else {
        card.appendChild(el("h3", "", person.name));
      }
      card.appendChild(el("p", "", person.email));
      card.appendChild(el("p", "", "Office hours: " + person.officeHours));
      target.appendChild(card);
    });
  }

  function activateTab(tabId, updateHash) {
    $$(".tab-button").forEach(function (button) {
      var active = button.getAttribute("data-tab") === tabId;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    $$(".tab-panel").forEach(function (panel) {
      panel.classList.toggle("active", panel.id === tabId);
    });
    if (updateHash) history.replaceState(null, "", "#" + tabId);
  }

  function initTabs() {
    $$(".tab-button").forEach(function (button) {
      button.addEventListener("click", function () {
        activateTab(button.getAttribute("data-tab"), true);
      });
    });
    $$("[data-tab-link]").forEach(function (navLink) {
      navLink.addEventListener("click", function () {
        activateTab(navLink.getAttribute("data-tab-link"), false);
      });
    });
    var initial = window.location.hash.replace("#", "");
    if (["syllabus", "schedule", "materials", "assignments", "staff"].indexOf(initial) >= 0) {
      activateTab(initial, false);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAnnouncement();
    renderMeta();
    renderTopics();
    renderSyllabus();
    renderSchedule("all");
    renderMaterials();
    renderAssignments();
    renderStaff();
    initTabs();

    var announcementToggle = $("#announcement-toggle");
    if (announcementToggle) {
      announcementToggle.addEventListener("click", function () {
        var target = $("#announcement-list");
        var showAll = target.getAttribute("data-show-all") === "true";
        target.setAttribute("data-show-all", showAll ? "false" : "true");
        renderAnnouncement();
      });
    }

    $("#week-filter").addEventListener("change", function (event) {
      renderSchedule(event.target.value);
    });
  });
})();
