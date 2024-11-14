import hashlib


class HashHandler:
    """
    Hash handler

    Methods
    -------
    hash(data: str) -> str
        Hashes the data
    """

    @staticmethod
    def hash(data: str) -> str:
        """
        Hashes the data

        Parameters
        ----------
        data : str
            The data to hash

        Returns
        -------
        str
            The hashed data
        """

        algorithm = hashlib.sha256()
        algorithm.update(data.encode())

        return algorithm.hexdigest()
