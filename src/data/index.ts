import data from './bd.json'

export class Data {
  public getJobs () {
    return data.jobs
  }

  public getJob (id: number) {
    const job = data.jobs.find(job => job.id === id)
    if (!job) {
      return null
    }
    return job
  }
}
