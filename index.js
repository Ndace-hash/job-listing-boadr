const jobsBoard = document.querySelector("#jobs");
const filtersContainer = document.querySelector("#filters");
const removeFilterButtons = document.querySelectorAll(".remove-filter");
const clearFilters = document.querySelector("#clear-filters");

document.addEventListener("DOMContentLoaded", async () => {
  const jobs = await getJobsData();
  createJobCards(jobs);
  console.log(jobs);
});

const getJobsData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
};

const createJobCards = (jobs) => {
  jobs.forEach((job) => {
    const jobCard = document.createElement("article");
    jobCard.setAttribute("class", `job-card ${job.featured ? "featured" : ""}`);

    const companyLogo = document.createElement("div");
    companyLogo.setAttribute("class", "company-logo");
    const logo = document.createElement("img");
    logo.src = job.logo;
    logo.alt = job.company;
    companyLogo.append(logo);
    jobCard.append(companyLogo);

    const jobDesc = document.createElement("div");
    jobDesc.classList.add("job-desc");

    const company = document.createElement("div");
    company.classList.add("company");

    const companyDetails = document.createElement("div");
    companyDetails.classList.add("company-details");

    const companyName = document.createElement("h2");
    companyName.classList.add("company-name");
    companyName.innerText = job.company;

    const tags = document.createElement("div");
    tags.classList.add("tags");

    companyDetails.append(companyName);
    companyDetails.append(tags);
    company.append(companyDetails);
    jobDesc.append(company);

    jobCard.append(jobDesc);

    if (job.new) {
      const newJob = document.createElement("span");
      newJob.classList.add("tag");
      newJob.innerText = "New!";
      tags.append(newJob);
    }
    if (job.featured) {
      const featured = document.createElement("span");
      featured.classList.add("tag");
      featured.innerText = "Featured";
      tags.append(featured);
    }

    const position = document.createElement("h3");
    position.classList.add("postion");
    position.innerText = job.position;
    company.append(position);

    const details = document.createElement("p");
    details.classList.add("details");
    details.innerText = `${job.postedAt} - ${job.contract} - ${job.location}`;
    company.append(details);

    const tools = document.createElement("div");
    tools.classList.add("tools");

    job.tools.forEach((t) => {
      const tool = document.createElement("span");
      tool.textContent = t;
      tools.append(tool);
    });

    job.languages.forEach((l) => {
      const language = document.createElement("span");
      language.textContent = l;
      tools.append(language);
    });
    jobDesc.append(tools);

    jobsBoard.append(jobCard);
  });
};
