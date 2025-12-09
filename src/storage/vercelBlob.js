import axios from 'axios'

export class VercelBlobStorage {
  constructor({ storeName, apiKey }) {
    this.storeName = storeName
    this.apiKey = apiKey
    this.baseUrl = `https://api.vercel.com/v1/blob/stores/${storeName}/files`
  }

  async save(file) {
    const { buffer, originalname, mimetype } = file

    const response = await axios.post(this.baseUrl, buffer, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': mimetype,
        'x-vercel-file-name': originalname,
      },
    })

    return {
      filename: originalname,
      url: response.data.url,
      size: buffer.length,
    }
  }

  async delete(file) {
    if (!file.url) return
    await axios.delete(file.url, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    })
  }
}
