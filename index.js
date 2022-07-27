const jobsBoard = document.querySelector("#jobs");
const filterWrapper = document.querySelector(".filters-wrapper");
const filtersContainer = document.querySelector("#filters");
let filters = [];

let jobs;
if (filters.length == 0) {
  filterWrapper.style.display = "none";
}

const getJobsData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
};

const createJobCards = (jobs) => {
  jobsBoard.innerHTML = null;
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

    const role = document.createElement("span");
    role.classList.add("tool");
    role.textContent = job.role;
    tools.append(role);

    const level = document.createElement("span");
    level.classList.add("tool");
    level.textContent = job.level;
    tools.append(level);

    job.tools.forEach((t) => {
      const tool = document.createElement("span");
      tool.classList.add("tool");
      tool.textContent = t;
      tools.append(tool);
    });

    job.languages.forEach((l) => {
      const language = document.createElement("span");
      language.classList.add("tool");
      language.textContent = l;
      tools.append(language);
    });
    jobDesc.append(tools);

    jobsBoard.append(jobCard);
  });
};

const filterJobs = async () => {
  let filteredJobs = jobs.filter((job) => {
    const jobRequirement = [
      job.level,
      job.role,
      ...job.languages,
      ...job.tools,
    ];

    if (filters.every((val) => jobRequirement.includes(val))) {
      return job;
    }
  });
  createJobCards(filteredJobs);
};

const createFilter = async (target) => {
  if (!filters.includes(target.innerText)) {
    filters.push(target.innerText);

    const filter = document.createElement("div");
    filter.classList.add("filter");
    const filterName = document.createElement("span");
    filterName.classList.add("filter-name");
    filterName.innerText = target.innerText;
    const removeFilter = document.createElement("button");
    removeFilter.classList.add("remove-filter");
    removeFilter.innerText = "x";
    filter.append(filterName);
    filter.append(removeFilter);
    filtersContainer.append(filter);

    filterWrapper.style.display = "flex";
  }
  filterJobs();
};

const clearFilters = async () => {
  filters = [];
  filterWrapper.style.display = "none";
  filtersContainer.innerHTML = null;
  createJobCards(jobs);
};

async function loadContent() {
  jobs = await getJobsData();
  createJobCards(jobs);
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});

window.addEventListener("click", (event) => {
  const target = event.target;

  // add a new filter
  if (target.classList.contains("tool")) {
    createFilter(target);
  }

  // remove an existing filter
  if (target.classList.contains("remove-filter")) {
    filtersContainer.removeChild(target.parentElement);
    filters = filters.filter(
      (filterToRemove) =>
        filterToRemove !== target.parentElement.firstChild.innerText
    );
    filterJobs();
    if (!filters.length) filterWrapper.style.display = "none";
  }

  // clear all existing filters
  if (target.id == "clear-filters") {
    clearFilters();
  }
});
